package com.halleyshow.jornadaviva;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;

public class MainActivity extends Activity {
    private WebView webView;
    private static final String LOCAL_URL = "http://10.0.0.102:8799/";
    private static final String FALLBACK_URL = "https://halley-show-jornada-viva-base-75al80.v2.appdeploy.ai/";
    private boolean fallbackUsed = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(Color.rgb(7, 8, 10));
        getWindow().setNavigationBarColor(Color.rgb(7, 8, 10));

        webView = new WebView(this);
        webView.setBackgroundColor(Color.rgb(7, 8, 10));

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setMediaPlaybackRequiresUserGesture(false);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (request.isForMainFrame()
                    && !fallbackUsed
                    && request.getUrl().toString().startsWith("http://10.0.0.105:8799/")) {
                    fallbackUsed = true;
                    view.loadUrl(FALLBACK_URL);
                    return;
                }
                super.onReceivedError(view, request, error);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                view.scrollTo(0, 0);
            }
        });

        webView.setWebChromeClient(new WebChromeClient());
        FrameLayout root = new FrameLayout(this);
        root.addView(webView, new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
        TextView menuButton = new TextView(this);
        menuButton.setText("⋮");
        menuButton.setTextColor(Color.WHITE);
        menuButton.setTextSize(28f);
        menuButton.setGravity(Gravity.CENTER);
        menuButton.setContentDescription("Menu");
        menuButton.setBackgroundColor(Color.argb(170, 7, 8, 10));
        int menuSize = (int) (52 * getResources().getDisplayMetrics().density);
        int menuMargin = (int) (6 * getResources().getDisplayMetrics().density);
        FrameLayout.LayoutParams menuParams = new FrameLayout.LayoutParams(menuSize, menuSize, Gravity.TOP | Gravity.END);
        menuParams.setMargins(menuMargin, menuMargin, menuMargin, 0);
        root.addView(menuButton, menuParams);
        menuButton.setOnClickListener(this::showNavigationMenu);
        setContentView(root);

        if (savedInstanceState == null) {
            String launchUrl = LOCAL_URL;
            String targetView = getIntent().getStringExtra("view");
            String muscle = getIntent().getStringExtra("muscle");
            String qa = getIntent().getStringExtra("qa");
            boolean hasNativeDeepLink = (targetView != null && !targetView.isEmpty())
                || (muscle != null && !muscle.isEmpty())
                || (qa != null && !qa.isEmpty());
            if (hasNativeDeepLink) {
                launchUrl += "?native=1";
                if (targetView != null && !targetView.isEmpty()) launchUrl += "&view=" + Uri.encode(targetView);
                if (muscle != null && !muscle.isEmpty()) launchUrl += "&muscle=" + Uri.encode(muscle);
                if (qa != null && !qa.isEmpty()) launchUrl += "&qa=" + Uri.encode(qa);
            }
            webView.loadUrl(launchUrl);
        } else {
            webView.restoreState(savedInstanceState);
        }
    }

    private void showNavigationMenu(View anchor) {
        PopupMenu menu = new PopupMenu(this, anchor);
        menu.getMenu().add("Início");
        menu.getMenu().add("Área do aluno");
        menu.getMenu().add("Abrir no Chrome");
        menu.getMenu().add("Compartilhar");
        menu.setOnMenuItemClickListener(item -> {
            String title = item.getTitle().toString();
            if ("Início".equals(title)) { webView.loadUrl(LOCAL_URL); return true; }
            if ("Área do aluno".equals(title)) { webView.loadUrl(LOCAL_URL + "?native=1"); return true; }
            if ("Abrir no Chrome".equals(title)) { startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(currentExternalUrl()))); return true; }
            if ("Compartilhar".equals(title)) {
                Intent shareIntent = new Intent(Intent.ACTION_SEND);
                shareIntent.setType("text/plain");
                shareIntent.putExtra(Intent.EXTRA_TEXT, currentExternalUrl());
                startActivity(Intent.createChooser(shareIntent, "Compartilhar Halley Show"));
                return true;
            }
            return false;
        });
        menu.show();
    }

    private String currentExternalUrl() {
        String current = webView.getUrl();
        if (current == null || current.isEmpty()) return FALLBACK_URL;
        if (current.startsWith(LOCAL_URL)) return current.replace(LOCAL_URL, FALLBACK_URL);
        return current;
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }
}
