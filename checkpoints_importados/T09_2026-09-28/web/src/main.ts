import './styles.css';

type View =
  | 'publicHome'
  | 'publicCalisthenics'
  | 'publicContent'
  | 'home'
  | 'workout'
  | 'perception'
  | 'sofia'
  | 'evolution'
  | 'resenha';
type Mode = 'public' | 'member';
type Muscle =
  | 'Peitoral'
  | 'Costas'
  | 'Pernas'
  | 'Ombros'
  | 'Bíceps'
  | 'Tríceps';

type SessionState = {
  completedSets: number[];
  perception: string | null;
  discomfort: boolean;
  completedAt: string | null;
};

// Cache transitório do LAB; a fonte longitudinal real é o motor NAVE.
const STORAGE_KEY_PREFIX = 'halley-lab-cache-v03';
const studentName = 'Ricardão';

type ExerciseDef = {
  name: string;
  equipment: string;
  muscle: Muscle;
  tip: string;
  error: string;
  sets: number;
  visual: string;
};

const exerciseCatalog: Partial<Record<Muscle, ExerciseDef>> = {
  Peitoral: {
    name: 'Chest Press',
    equipment: 'Máquina Chest Press',
    muscle: 'Peitoral',
    tip: 'Controle o movimento e mantenha o tronco apoiado.',
    error: 'Evite perder o controle na volta do movimento.',
    sets: 3,
    visual: './resources/chest-press.png',
  },
};

const muscleVisuals: Record<Muscle, string> = {
  Peitoral: './resources/chest-press.png',
  Costas: './resources/costas-remada.png',
  Pernas: './resources/leg-press.png',
  Ombros: './resources/ombros-press.png',
  'Bíceps': './resources/biceps-rosca.png',
  'Tríceps': './resources/triceps-polia.png',
};

function selectedExercise(): ExerciseDef | null {
  return exerciseCatalog[selectedMuscle] ?? null;
}

const emptySession = (): SessionState => ({
  completedSets: [],
  perception: null,
  discomfort: false,
  completedAt: null,
});

const launchParams = new URLSearchParams(window.location.search);
const nativeApp = launchParams.get('native') === '1';
const launchView = launchParams.get('view') as View | null;
const launchMuscle = launchParams.get('muscle') as Muscle | null;
let mode: Mode = nativeApp ? 'member' : 'public';
let view: View = nativeApp && launchView ? launchView : nativeApp ? 'home' : 'publicHome';
let selectedMuscle: Muscle = launchMuscle || 'Peitoral';

let session: SessionState = loadSession(selectedMuscle);

const MOTOR_STUDENT_ID = 'student_demo_01';
let motorToday: any = null;
let motorEvolution: any = null;
let motorSofia: any = null;
let motorLatestPerception: any = null;
let motorProfessor: any = null;
let motorLastPerformance: any = null;
let motorStatus: 'loading' | 'pass' | 'blocked' = 'loading';
let motorWriteStatus: 'idle' | 'sending' | 'pass' | 'blocked' = 'idle';
let motorMessage = 'Conectando com a NAVE...';
let motorReceipt: any = null;

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

let installPrompt: InstallPromptEvent | null = null;
let installState: 'idle' | 'ready' | 'installed' | 'instructions' =
  window.matchMedia('(display-mode: standalone)').matches ? 'installed' : 'idle';

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  installPrompt = event as InstallPromptEvent;
  installState = 'ready';
  render();
});

window.addEventListener('appinstalled', () => {
  installPrompt = null;
  installState = 'installed';
  render();
});

async function motorRequest(kind: 'treinos' | 'evolucao' | 'sofia', path: string, init: RequestInit = {}): Promise<any> {
  const base = kind === 'treinos' ? '/nave/treinos' : kind === 'evolucao' ? '/nave/evolucao' : '/nave/sofia';
  const response = await fetch(base + path, {
    cache: 'no-store',
    ...init,
    headers: {
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(init.headers ?? {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body?.detail || ('HTTP_' + response.status));
  return body;
}

function performanceForSet(n: number): any | null {
  const sets = motorLastPerformance?.sets ?? [];
  return sets.find((item: any) => Number(item.set_number) === n) ?? null;
}

async function syncRealSets(): Promise<void> {
  const sessionId = motorToday?.active_session?.id;
  if (!sessionId) {
    session.completedSets = [];
    return;
  }
  const sets = await motorRequest('treinos', '/sessions/' + sessionId + '/exercises/chest_press/sets');
  session.completedSets = sets
    .filter((item: any) => item.status === 'completed')
    .map((item: any) => Number(item.set_number))
    .sort((a: number, b: number) => a - b);
  persist();
}

async function refreshMotorState(shouldRender = true): Promise<void> {
  motorStatus = 'loading';
  try {
    const values = await Promise.all([
      motorRequest('treinos', '/students/' + MOTOR_STUDENT_ID + '/today'),
      motorRequest('evolucao', '/students/' + MOTOR_STUDENT_ID + '/evolution'),
      motorRequest('sofia', '/' + MOTOR_STUDENT_ID + '/context'),
      motorRequest('treinos', '/students/' + MOTOR_STUDENT_ID + '/perceptions/latest'),
      motorRequest('treinos', '/students/' + MOTOR_STUDENT_ID + '/professor/latest'),
      motorRequest('treinos', '/students/' + MOTOR_STUDENT_ID + '/exercises/chest_press/last-performance'),
    ]);
    motorToday = values[0];
    motorEvolution = values[1];
    motorSofia = values[2];
    motorLatestPerception = values[3];
    motorProfessor = values[4];
    motorLastPerformance = values[5];
    await syncRealSets();
    motorStatus = 'pass';
    motorMessage = motorToday?.active_session ? 'NAVE conectada · sessão real ativa' : 'NAVE conectada · pronta para nova sessão';
  } catch (error) {
    motorStatus = 'blocked';
    motorMessage = 'NAVE indisponível: ' + String((error as Error)?.message ?? error);
  }
  if (shouldRender) render();
}

async function ensureMotorSession(): Promise<any> {
  if (!motorToday) await refreshMotorState(false);
  if (motorToday?.active_session?.id) return motorToday.active_session;
  const started = await motorRequest('treinos', '/students/' + MOTOR_STUDENT_ID + '/sessions', {
    method: 'POST',
    body: JSON.stringify({ workout_plan_id: motorToday?.plan?.id || 'peitoral_a' }),
  });
  motorToday = { ...(motorToday ?? {}), active_session: started };
  return started;
}

async function completeRealSet(n: number): Promise<void> {
  if (selectedMuscle !== 'Peitoral') return;
  if (n !== session.completedSets.length + 1) return;
  motorWriteStatus = 'sending';
  motorMessage = 'Registrando Série ' + n + ' no Motor...';
  render();
  try {
    const active = await ensureMotorSession();
    const list = await motorRequest('treinos', '/sessions/' + active.id + '/exercises/chest_press/sets');
    let row = list.find((item: any) => Number(item.set_number) === n);
    if (!row) {
      const previous = performanceForSet(n);
      if (!previous) throw new Error('SEM_ULTIMO_REGISTRO_PARA_SERIE');
      row = await motorRequest('treinos', '/sessions/' + active.id + '/exercises/chest_press/sets', {
        method: 'POST',
        body: JSON.stringify({
          reps: previous.reps,
          load_value: previous.load_value,
          load_unit: previous.load_unit,
          note: 'Repetição do último registro real; confirmação pelo aluno no LAB.',
        }),
      });
    }
    if (row.status !== 'completed') {
      await motorRequest('treinos', '/sessions/' + active.id + '/exercises/chest_press/sets/' + row.id + '/complete', { method: 'POST' });
    }
    await syncRealSets();
    motorWriteStatus = 'pass';
    motorMessage = 'Série ' + n + ' registrada na NAVE';
  } catch (error) {
    motorWriteStatus = 'blocked';
    motorMessage = 'Registro bloqueado: ' + String((error as Error)?.message ?? error);
  }
}

async function closeRealWorkout(perceptionLabel: string): Promise<void> {
  motorWriteStatus = 'sending';
  motorMessage = 'Fechando treino na NAVE...';
  render();
  const active = await ensureMotorSession();
  const map: Record<string, string> = {
    'Tudo certo': 'NA_MEDIDA',
    'Pegou pesado': 'PESADO',
    'Senti dor ou desconforto': 'FALAR_COM_PROFESSOR',
  };
  const normalized = map[perceptionLabel];
  const key = 'HALLEY-JORNADA-' + Date.now() + '-' + Math.random().toString(16).slice(2);
  try {
    const receipt = await motorRequest('treinos', '/perceptions', {
      method: 'POST',
      body: JSON.stringify({
        student_id: MOTOR_STUDENT_ID,
        session_id: active.id,
        exercise_id: 'chest_press',
        perception: normalized,
        idempotency_key: key,
      }),
    });
    if (normalized === 'FALAR_COM_PROFESSOR') {
      await motorRequest('treinos', '/professor/escalations', {
        method: 'POST',
        body: JSON.stringify({
          perception_event_id: receipt.event_id,
          idempotency_key: 'PROF-' + key,
        }),
      });
    }
    await motorRequest('treinos', '/sessions/' + active.id + '/complete', { method: 'POST' });
    motorReceipt = receipt;
    session.completedSets = [1, 2, 3];
    session.perception = perceptionLabel;
    session.discomfort = normalized === 'FALAR_COM_PROFESSOR';
    session.completedAt = new Date().toISOString();
    persist();
    await refreshMotorState(false);
    motorWriteStatus = 'pass';
    motorMessage = 'Treino, percepção, Evolução e Sofia reconciliados com a NAVE';
  } catch (error) {
    motorWriteStatus = 'blocked';
    motorMessage = 'Fechamento bloqueado: ' + String((error as Error)?.message ?? error);
    throw error;
  }
}


function storageKey(muscle: Muscle): string {
  return `${STORAGE_KEY_PREFIX}:${muscle}`;
}

function loadSession(muscle: Muscle): SessionState {
  try {
    const raw = localStorage.getItem(storageKey(muscle));
    return raw ? { ...emptySession(), ...JSON.parse(raw) } : emptySession();
  } catch {
    return emptySession();
  }
}

function persist(): void {
  localStorage.setItem(storageKey(selectedMuscle), JSON.stringify(session));
}

function todayLabel(): string {
  const value = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(new Date());
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function icon(name: string): string {
  const icons: Record<string, string> = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    dumbbell:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8v8M3.5 9.5v5M18 8v8m2.5-6.5v5M6 12h12"/></svg>',
    chart:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V9m7 10V5m7 14v-7"/></svg>',
    book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5zm16 0A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z"/></svg>',
    spark:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-5 5 5-5 5"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
    alert:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 3 20h18zm0 5v5m0 3h.01"/></svg>',
  };
  return icons[name] ?? '';
}

function bodyMap(muscle: Muscle): string {
  const visual = muscleVisuals[muscle];
  const approved = Boolean(exerciseCatalog[muscle]);
  return `
    <div class="body-map photo-map" data-muscle="${muscle.toLowerCase()}">
      <img class="muscle-photo" src="${visual}" alt="Referência visual do grupo ${muscle} com Professor Halley" />
      <div class="photo-shade"></div>
      <div class="body-map-label">${approved ? 'VISUAL DO TREINO' : 'REFERÊNCIA VISUAL · EM VALIDAÇÃO'}</div>
      <div class="body-map-focus"><span>GRUPO EM FOCO</span><strong>${muscle}</strong></div>
    </div>
  `;
}

function nav(): string {
  if (mode === 'public') {
    const publicItems: Array<{ id: View; label: string; iconName: string }> = [
      { id: 'publicHome', label: 'Início', iconName: 'home' },
      { id: 'publicCalisthenics', label: 'Calistenia', iconName: 'dumbbell' },
      { id: 'publicContent', label: 'Conteúdos', iconName: 'book' },
      { id: 'resenha', label: 'Digital', iconName: 'spark' },
    ];

    return `
      <nav class="bottom-nav public-nav" aria-label="Navegação pública">
        ${publicItems
          .map(
            item => `
          <button class="nav-item ${view === item.id ? 'active' : ''}" data-nav="${item.id}">
            <span class="nav-icon">${icon(item.iconName)}</span>
            <span>${item.label}</span>
          </button>
        `
          )
          .join('')}
        <button class="nav-item member-entry-nav" data-action="enter-member">
          <span class="nav-icon">${icon('chart')}</span>
          <span>Sou aluno</span>
        </button>
      </nav>
    `;
  }

  const items: Array<{ id: View; label: string; iconName: string }> = [
    { id: 'home', label: 'Hoje', iconName: 'home' },
    { id: 'workout', label: 'Meu treino', iconName: 'dumbbell' },
    { id: 'evolution', label: 'Evolução', iconName: 'chart' },
    { id: 'resenha', label: 'Digital', iconName: 'book' },
    { id: 'sofia', label: 'Sofia', iconName: 'spark' },
  ];
  return `
    <nav class="bottom-nav" aria-label="Navegação do aluno">
      ${items
        .map(
          item => `
        <button class="nav-item ${view === item.id ? 'active' : ''}" data-nav="${item.id}">
          <span class="nav-icon">${icon(item.iconName)}</span>
          <span>${item.label}</span>
        </button>
      `
        )
        .join('')}
    </nav>
  `;
}

function header(): string {
  return `
    <header class="topbar">
      <button class="brand" data-nav="${mode === 'public' ? 'publicHome' : 'home'}" aria-label="Ir para o início">
        <span class="brand-mark">H</span>
        <span><strong>HALLEY SHOW</strong><small>ACADEMIA</small></span>
      </button>
      <div class="header-actions">
        ${mode === 'member' ? '<button class="public-return" data-action="go-public">Área pública</button>' : ''}
        <span class="prototype-pill">${mode === 'public' ? 'ACESSO PÚBLICO · LAB' : 'ALUNO · DEMO LAB'}</span>
      </div>
    </header>
  `;
}

function installPanel(): string {
  const installed = installState === 'installed' || window.matchMedia('(display-mode: standalone)').matches;
  const ready = installState === 'ready';
  const instructions = installState === 'instructions';
  return `
    <article class="install-panel ${installed ? 'installed' : ready ? 'ready' : ''}">
      <div class="install-copy">
        <span class="eyebrow">HALLEY NO SEU CELULAR</span>
        <h2>${installed ? 'App instalado.' : 'Leve a Halley com você.'}</h2>
        <p>${
          installed
            ? 'Esta versão já está aberta como aplicativo instalado.'
            : ready
              ? 'Seu navegador confirmou que esta versão pode ser instalada como app.'
              : instructions
                ? 'No Chrome do Android, abra o menu do navegador e escolha “Instalar app” ou “Adicionar à tela inicial”.'
                : 'Abra este mesmo endereço no Chrome do Android. Quando o navegador liberar a instalação, o botão ativa automaticamente.'
        }</p>
        <button class="cta-primary install-cta" data-action="install-app" ${installed ? 'disabled' : ''}>
          ${installed ? 'INSTALADO' : ready ? 'INSTALAR APP' : 'COMO INSTALAR'} <span>${installed ? icon('check') : icon('arrow')}</span>
        </button>
      </div>
      <div class="install-qr-wrap">
        <img src="./resources/qr-halley-public.png" alt="QR code para abrir o Halley Show Jornada Viva" />
        <small>QR ÚNICO · MESMO LINK PÚBLICO</small>
      </div>
    </article>
  `;
}

function publicHomeView(): string {
  return `
    <section class="view public-home-view">
      <article class="public-hero">
        <div class="public-hero-copy">
          <div class="eyebrow">ACADEMIA HALLEY SHOW · ACESSO LIVRE</div>
          <h1>Seu corpo.<br><span>Seu começo.</span></h1>
          <p>Você não precisa ter cadastro para começar a conhecer a Halley. Use a camada pública, explore conteúdos e entre como aluno somente quando fizer sentido.</p>
          <div class="public-hero-actions">
            <button class="cta-primary" data-nav="publicCalisthenics">CALISTENIA GRÁTIS <span>${icon('arrow')}</span></button>
            <button class="cta-secondary" data-action="enter-member">JÁ SOU ALUNO</button>
          </div>
        </div>
        <div class="public-orbit halley-hero" aria-label="Professor Halley Show">
          <img src="./resources/professor-halley.png" alt="Professor Halley Show" />
          <span class="orbit-label one">MOVIMENTO</span>
          <span class="orbit-label two">DICAS</span>
          <span class="orbit-label three">RESENHA</span>
        </div>
      </article>

      ${installPanel()}

      <div class="public-section-head">
        <div>
          <div class="eyebrow">EXPLORE SEM CADASTRO</div>
          <h2>Utilidade primeiro.</h2>
        </div>
        <p>Camada pública sem histórico pessoal e sem prescrição individual.</p>
      </div>

      <div class="public-grid">
        <button class="public-card featured" data-nav="publicCalisthenics">
          <span class="public-card-index">01</span>
          <strong>Calistenia</strong>
          <small>Movimentos e aulas públicas entram aqui quando o conteúdo técnico estiver aprovado.</small>
          <span class="availability">GRÁTIS · ESTRUTURA PRONTA</span>
        </button>
        <button class="public-card" data-nav="publicContent">
          <span class="public-card-index">02</span>
          <strong>Movimentos & mobilidade</strong>
          <small>Conteúdo curto, visual e sem personalização clínica.</small>
          <span class="availability pending">CONTEÚDO EM PREPARAÇÃO</span>
        </button>
        <button class="public-card" data-nav="publicContent">
          <span class="public-card-index">03</span>
          <strong>Dicas</strong>
          <small>Explicações rápidas e conteúdo aprovado do professor.</small>
          <span class="availability pending">CONTEÚDO EM PREPARAÇÃO</span>
        </button>
        <button class="public-card" data-nav="resenha">
          <span class="public-card-index">04</span>
          <strong>Academia Digital</strong>
          <small>Treino, conteúdo, histórias e Resenha da Casa em uma área editorial nativa.</small>
          <span class="availability">ABRIR ACADEMIA DIGITAL</span>
        </button>
      </div>

      <article class="member-bridge">
        <div>
          <span class="eyebrow">JÁ TREINA COM A GENTE?</span>
          <h2>Seu treino de hoje está do outro lado.</h2>
          <p>No laboratório, essa entrada demonstra a experiência do aluno identificado sem declarar autenticação real.</p>
        </div>
        <button class="cta-primary" data-action="enter-member">ENTRAR COMO ALUNO <span>${icon('arrow')}</span></button>
      </article>
    </section>
  `;
}

function publicCalisthenicsView(): string {
  return `
    <section class="view public-library-view">
      <div class="eyebrow">CALISTENIA · ACESSO PÚBLICO</div>
      <h1>Treine onde<br>você estiver.</h1>
      <p class="lead">A porta pública já existe. O conteúdo técnico entra em pequenos lotes depois de aprovação — não inventamos movimento só para encher a tela.</p>

      <div class="public-module-grid">
        <article class="public-module">
          <span class="module-status">EM PREPARAÇÃO TÉCNICA</span>
          <strong>Começar do básico</strong>
          <p>Primeiro lote futuro: até 3 movimentos aprovados.</p>
        </article>
        <article class="public-module">
          <span class="module-status">EM PREPARAÇÃO TÉCNICA</span>
          <strong>Mobilidade</strong>
          <p>Entrada reservada para conteúdo validado e reutilizável.</p>
        </article>
        <article class="public-module">
          <span class="module-status">EM PREPARAÇÃO TÉCNICA</span>
          <strong>Movimentos</strong>
          <p>Catálogo público só publica itens com fonte e status de aprovação.</p>
        </article>
      </div>

      <div class="public-inline-actions">
        <button class="cta-secondary" data-nav="publicContent">VER CONTEÚDOS</button>
        <button class="cta-secondary" data-nav="resenha">PASSAR NA RESENHA</button>
      </div>
    </section>
  `;
}

function publicContentView(): string {
  return `
    <section class="view public-library-view">
      <div class="eyebrow">CONTEÚDOS · ACESSO PÚBLICO</div>
      <h1>Aprenda sem<br>complicar.</h1>
      <p class="lead">A Library já prevê dicas, mobilidade, vídeos curtos e cards. Neste incremento, a navegação foi aberta sem fabricar conteúdo técnico novo.</p>

      <div class="content-shelves">
        <article>
          <span>DICAS</span>
          <strong>Explicações rápidas do professor</strong>
          <small>EM PREPARAÇÃO · aguardando itens aprovados</small>
        </article>
        <article>
          <span>MOBILIDADE</span>
          <strong>Conteúdo curto para movimento</strong>
          <small>EM PREPARAÇÃO · aguardando itens aprovados</small>
        </article>
        <article>
          <span>ACADEMIA DIGITAL</span>
          <strong>Treino, conteúdo e Resenha da Casa</strong>
          <small>ÁREA EDITORIAL NATIVA · JÁ NAVEGÁVEL</small>
          <button data-nav="resenha">ABRIR ACADEMIA DIGITAL ${icon('arrow')}</button>
        </article>
      </div>
    </section>
  `;
}

function homeView(): string {
  const realStudent = motorToday?.student?.name || studentName;
  const active = motorToday?.active_session;
  const plan = motorToday?.plan;
  const latest = motorLatestPerception?.perception;
  const evo = motorEvolution?.summary ?? {};
  return `
    <section class="view home-view">
      <article class="living-hero">
        <div class="living-copy">
          <div class="live-kicker"><span></span> ${motorStatus === 'pass' ? 'NAVE CONECTADA' : motorStatus === 'blocked' ? 'NAVE INDISPONÍVEL' : 'CONECTANDO À NAVE'}</div>
          <h1>Fala,<br><span>${realStudent}.</span></h1>
          <p>${active ? 'Sua sessão real <strong>' + (plan?.name ?? 'de hoje') + '</strong> está ativa. Continue sem recomeçar.' : 'Seu próximo treino pode começar daqui. A NAVE mantém a continuidade.'}</p>
          <div class="living-actions">
            <button class="cta-primary" data-action="open-workout">${active ? 'CONTINUAR TREINO' : 'ABRIR TREINO'} <span>${icon('arrow')}</span></button>
            <button class="cta-secondary" data-nav="sofia">FALAR COM SOFIA</button>
          </div>
          <div class="motor-line">${motorMessage}</div>
        </div>
        <div class="living-halley"><img src="./resources/professor-halley.png" alt="Professor Halley Show" /><span>PROFESSOR HALLEY</span></div>
      </article>

      <div class="live-metrics">
        <article><span>SESSÃO REAL</span><strong>${active ? 'ATIVA' : 'PRONTA'}</strong><small>${plan?.name ?? 'Peitoral A'}</small></article>
        <article><span>ÚLTIMA PERCEPÇÃO</span><strong>${latest ?? '—'}</strong><small>Motor progress_events</small></article>
        <article><span>EVOLUÇÃO</span><strong>${evo.completed_workouts ?? 0}</strong><small>treinos concluídos</small></article>
      </div>

      <article class="today-card">
        <div class="today-copy">
          <div class="eyebrow">CIRCUITO 01 · CHEST PRESS</div>
          <h2>Treino real. Registro real.</h2>
          <p>As séries marcadas aqui entram no ledger da NAVE. Ao finalizar, percepção, Evolução e Sofia leem o mesmo estado.</p>
          <button class="cta-primary" data-action="open-workout">ABRIR CHEST PRESS <span>${icon('arrow')}</span></button>
        </div>
        <div class="today-halley"><img src="./resources/chest_press_aprovado.png" alt="Professor Halley no Chest Press" /></div>
      </article>

      <div class="presence-grid">
        <article class="presence-card halley-presence">
          <img src="./resources/professor-halley.png" alt="Professor Halley" />
          <div><span>PROFESSOR HALLEY</span><strong>Presente no treino.</strong><small>Execução, referência técnica e entrada humana quando necessário.</small></div>
        </article>
        <button class="presence-card sofia-presence" data-nav="sofia">
          <img src="./resources/sofia_acolhendo.png" alt="Sofia" />
          <div><span>SOFIA</span><strong>${latest ? '“Eu lembro: ' + latest + '.”' : '“Eu acompanho o que você registrar.”'}</strong><small>Continuidade, percepção, evolução e professor no mesmo fio.</small></div>
        </button>
      </div>
    </section>
  `;
}

function workoutView(): string {
  const exercise = selectedExercise();
  const completed = session.completedSets.length;
  const isApproved = Boolean(exercise);
  const totalSets = exercise?.sets ?? 0;
  return `
    <section class="view workout-view">
      <div class="section-head">
        <div>
          <div class="eyebrow">MEU TREINO</div>
          <h1>Seu corpo.<br>Seu foco.</h1>
        </div>
        <div class="progress-ring"><strong>${isApproved ? `${completed}/${totalSets}` : '--'}</strong><span>séries</span></div>
      </div>

      <div class="muscle-tabs" role="tablist" aria-label="Grupos musculares">
        ${(
          [
            'Peitoral',
            'Costas',
            'Pernas',
            'Ombros',
            'Bíceps',
            'Tríceps',
          ] as Muscle[]
        )
          .map(
            m => `
          <button role="tab" aria-selected="${selectedMuscle === m}" class="${selectedMuscle === m ? 'active' : ''}" data-muscle="${m}">${m}</button>
        `
          )
          .join('')}
      </div>

      <article class="muscle-focus-card ${isApproved ? '' : 'preparing'}">
        ${bodyMap(selectedMuscle)}
        <div class="focus-copy">
          <span class="focus-status">${isApproved ? 'CONTEÚDO ATIVO' : 'VISUAL DISPONÍVEL · TÉCNICA EM PREPARAÇÃO'}</span>
          <h2>${selectedMuscle}</h2>
          ${
            isApproved && exercise
              ? `
            <p class="muscle-list"><strong>Exercício disponível:</strong> ${exercise.name}. A região aparece destacada no mapa para a pessoa entender o foco do treino.</p>
            <p class="tech-note">Equipamento, dica e erro comum vêm somente do catálogo técnico autorizado.</p>
          `
              : `
            <p>A imagem do grupo já está encaixada para orientar visualmente a navegação. Exercício, séries, dica e erro comum só entram depois da autoridade técnica.</p>
            <div class="guardrail">VISUAL PRONTO · CONTEÚDO TÉCNICO EM VALIDAÇÃO</div>
          `
          }
        </div>
      </article>

      ${isApproved && exercise ? exerciseCard(exercise) : ''}
    </section>
  `;
}

function exerciseCard(exercise: ExerciseDef): string {
  const nextSet = session.completedSets.length + 1;
  return `
    <article class="exercise-card">
      <div class="exercise-top">
        <div>
          <div class="eyebrow">EXERCÍCIO 01 · MOTOR NAVE</div>
          <h2>${exercise.name}</h2>
          <p>${exercise.equipment} · ${exercise.muscle} · ${exercise.sets} séries</p>
        </div>
        <div class="exercise-badge ${motorStatus === 'pass' ? 'motor-pass' : ''}">${motorStatus === 'pass' ? 'NAVE ON' : 'LAB'}</div>
      </div>

      <div class="exercise-visual chest-press-visual"><img src="./resources/chest_press_aprovado.png" alt="Professor Halley executando ${exercise.name}" /></div>

      <div class="halley-tip-live">
        <img src="./resources/professor-halley.png" alt="Professor Halley" />
        <div><span>DICA DO PROFESSOR HALLEY</span><strong>${exercise.tip}</strong><small>${exercise.error}</small></div>
      </div>

      <div class="series-list">
        ${Array.from({ length: exercise.sets }, (_, index) => index + 1)
          .map(n => {
            const done = session.completedSets.includes(n);
            const previous = performanceForSet(n);
            const locked = !done && n !== nextSet;
            return `
            <button class="series-row ${done ? 'done' : ''} ${locked ? 'locked' : ''}" data-set="${n}" ${locked || motorWriteStatus === 'sending' ? 'disabled' : ''}>
              <span class="set-number">${done ? icon('check') : n}</span>
              <span class="set-copy">
                <strong>Série ${n}</strong>
                <small>${done ? 'Registrada na NAVE' : previous ? 'Último registro: ' + previous.reps + ' reps · ' + previous.load_value + ' ' + previous.load_unit : 'Aguardando referência real'}</small>
              </span>
              <span class="set-action">${done ? 'FEITA' : n === nextSet ? 'REGISTRAR' : 'AGUARDE'}</span>
            </button>
          `;
          })
          .join('')}
      </div>

      <div class="motor-feedback ${motorWriteStatus}"><span></span>${motorMessage}</div>

      <div class="session-footer">
        <div><span>LEDGER NAVE</span><strong>${session.completedSets.length} de ${exercise.sets} séries reais</strong></div>
        <button class="cta-primary ${session.completedSets.length < exercise.sets ? 'disabled' : ''}" data-action="finish-workout" ${session.completedSets.length < exercise.sets ? 'disabled' : ''}>
          FINALIZAR + PERCEPÇÃO <span>${icon('arrow')}</span>
        </button>
      </div>
    </article>
  `;
}

function perceptionView(): string {
  return `
    <section class="view perception-view">
      <div class="perception-with-sofia">
        <div>
          <div class="eyebrow">SOFIA · FECHAMENTO DO TREINO</div>
          <h1>Como ficou<br>de verdade?</h1>
          <p class="lead">Um toque. Eu registro no Motor e uso isso para continuar com você depois.</p>
        </div>
        <img src="./resources/sofia_indicando.png" alt="Sofia acompanhando o fechamento" />
      </div>
      <div class="perception-options">
        <button data-perception="Tudo certo"><span class="option-icon ok">✓</span><div><strong>Tudo certo</strong><small>Treino concluído normalmente.</small></div>${icon('arrow')}</button>
        <button data-perception="Pegou pesado"><span class="option-icon">↗</span><div><strong>Pegou pesado</strong><small>Registrar intensidade de hoje.</small></div>${icon('arrow')}</button>
        <button class="attention" data-perception="Senti dor ou desconforto"><span class="option-icon">${icon('alert')}</span><div><strong>Dor ou desconforto</strong><small>Sofia registra e chama a autoridade humana.</small></div>${icon('arrow')}</button>
      </div>
      <div class="motor-feedback ${motorWriteStatus}"><span></span>${motorMessage}</div>
    </section>
  `;
}

function sofiaView(): string {
  const today = motorSofia?.today?.data ?? motorToday;
  const last = motorLatestPerception?.perception ?? null;
  const evo = motorSofia?.evolution_snapshot?.data ?? motorEvolution?.summary ?? {};
  const profStatus = motorProfessor?.status ?? 'SEM SOLICITAÇÃO';
  const active = today?.active_session;
  return `
    <section class="view sofia-view">
      <article class="sofia-live-hero">
        <div class="sofia-live-copy">
          <div class="eyebrow">SOFIA · ACOMPANHAMENTO VIVO</div>
          <h1>Eu acompanho.<br>Você treina.</h1>
          <p>${active ? 'Tem uma sessão real ativa: <strong>' + (today?.plan?.name ?? 'Peitoral A') + '</strong>. Posso te levar direto para ela.' : last ? 'Seu último registro no Motor foi <strong>' + last + '</strong>. Eu uso isso para retomar sem interrogatório.' : 'Estou ligada à NAVE e pronta para acompanhar seu próximo registro.'}</p>
          <div class="sofia-actions">
            <button class="cta-primary" data-action="open-workout">${active ? 'CONTINUAR TREINO' : 'ABRIR TREINO'} <span>${icon('arrow')}</span></button>
            <button class="cta-secondary" data-action="refresh-motor">ATUALIZAR CONTEXTO</button>
          </div>
          <div class="motor-feedback ${motorStatus}"><span></span>${motorMessage}</div>
        </div>
        <div class="sofia-live-figure"><img src="./resources/sofia_acolhendo.png" alt="Sofia, assistente pessoal da Academia Halley Show" /></div>
      </article>

      <div class="sofia-memory-grid">
        <article><span>ÚLTIMA PERCEPÇÃO</span><strong>${last ?? '—'}</strong><small>Fonte: Motor NAVE</small></article>
        <article><span>TREINOS CONCLUÍDOS</span><strong>${evo.completed_workouts ?? 0}</strong><small>Evolução canônica</small></article>
        <article><span>PROFESSOR</span><strong>${profStatus}</strong><small>${session.discomfort ? 'Encaminhamento solicitado' : 'Entra quando necessário'}</small></article>
      </div>

      <article class="continuity-card">
        <img src="./resources/professor-halley.png" alt="Professor Halley" />
        <div><span>CONTINUIDADE</span><h2>${motorWriteStatus === 'pass' && session.perception ? 'Treino reconciliado com a NAVE.' : 'Sofia e Halley estão no mesmo circuito.'}</h2><p>${session.perception ? 'Hoje: ' + session.perception + '.' : 'Treino, percepção, evolução e autoridade humana deixam de ser telas soltas.'}</p></div>
      </article>
    </section>
  `;
}

function evolutionView(): string {
  const summary = motorEvolution?.summary ?? {};
  const sessions = (motorEvolution?.completed_sessions ?? []).slice(0, 5);
  return `
    <section class="view evolution-view">
      <div class="evolution-head-live">
        <div><div class="eyebrow">EVOLUÇÃO · MOTOR NAVE</div><h1>O treino deixa<br>rastro real.</h1><p class="lead">Esta tela lê o ledger canônico. O cache do celular não decide sua história.</p></div>
        <img src="./resources/professor-halley.png" alt="Professor Halley acompanhando evolução" />
      </div>
      <div class="metric-grid">
        <article><span>TREINOS CONCLUÍDOS</span><strong>${summary.completed_workouts ?? '—'}</strong><small>Motor Evolução</small></article>
        <article><span>SÉRIES REGISTRADAS</span><strong>${summary.registered_sets ?? '—'}</strong><small>ledger real</small></article>
        <article><span>VOLUME REGISTRADO</span><strong>${summary.volume_kg ?? '—'} kg</strong><small>somente o que existe no Motor</small></article>
      </div>
      <article class="timeline-card">
        <div class="timeline-line"></div>
        ${sessions.length ? sessions.map((item: any, index: number) => `
          <div class="timeline-item ${index === 0 ? 'current' : ''}"><span></span><div><strong>${item.workout_name ?? 'Treino'}</strong><small>${item.set_count ?? 0} séries · ${item.reps ?? 0} reps · ${item.volume_kg ?? 0} kg</small></div></div>
        `).join('') : '<div class="timeline-item current"><span></span><div><strong>Nenhum treino concluído</strong><small>A NAVE ainda não tem evento suficiente.</small></div></div>'}
      </article>
      <button class="cta-secondary" data-action="refresh-motor">ATUALIZAR DA NAVE</button>
    </section>
  `;
}

function resenhaView(): string {
  return `
    <section class="view resenha-view">
      <div class="resenha-hero">
        <div class="eyebrow">ACADEMIA DIGITAL · CONTEÚDO + RESENHA</div>
        <h1>A Halley continua<br>depois do treino.</h1>
        <p>Uma área editorial nativa da Academia: conteúdo técnico aprovado, histórias, memória da casa e Resenha. A Resenha é uma editoria — não o produto inteiro.</p>
      </div>

      <div class="digital-shelves" aria-label="Editorias da Academia Digital">
        <article>
          <span>01 · TREINO & CORPO</span>
          <strong>Conteúdo técnico aprovado</strong>
          <p>Explicações e referências entram aqui somente quando têm fonte e validação do professor.</p>
          <small>CHEST PRESS · PRIMEIRO CONTEÚDO APROVADO</small>
        </article>
        <article class="active">
          <span>02 · RESENHA DA CASA</span>
          <strong>Pertencimento sem pedágio</strong>
          <p>Humor, histórias e personagens podem acompanhar a vida da academia sem bloquear a jornada de treino.</p>
          <small>EDITORIA ATIVA NESTE LAB</small>
        </article>
        <article>
          <span>03 · HISTÓRIAS & COMUNIDADE</span>
          <strong>Memória com fonte</strong>
          <p>História factual da Academia só entra com evidência; narrativa ficcional permanece claramente marcada.</p>
          <small>ESTRUTURA PRONTA · CONTEÚDO GOVERNADO</small>
        </article>
      </div>

      <div class="resenha-rule">
        <span>REGRA DA RESENHA</span>
        <strong>Humor aproxima. Não constrange.</strong>
        <p>Participação é opcional, silêncio também vale e qualquer situação séria interrompe a brincadeira.</p>
      </div>

      <div class="story-stack">
        <details class="story-card featured family-story">
          <summary>
            <div class="story-number">R01</div>
            <div>
              <span>RESENHA · UNIVERSO FICCIONAL · FAMÍLIA DO SERTÃO</span>
              <h2>Primeiro conteúdo da Resenha: a família que já existe no patrimônio narrativo.</h2>
              <p>Elenco sintético usado como lente social e humor leve. Não representa pessoas reais nem memória factual da academia.</p>
              <b class="story-cta">ABRIR PERSONAGENS ${icon('arrow')}</b>
            </div>
          </summary>
          <div class="family-cast">
            <article><strong>Seu Tonho</strong><small>Avô · observação lateral e provocação afetiva.</small></article>
            <article><strong>Dona Zefa</strong><small>Avó · comentário cotidiano e comparação cultural.</small></article>
            <article><strong>Seu Ricardo</strong><small>Pai · custo, organização e responsabilidade em tom leve.</small></article>
            <article><strong>Patrícia</strong><small>Mãe · equilíbrio, mediação e acolhimento.</small></article>
            <article><strong>Zefinha</strong><small>Filha adolescente · tecnologia, descoberta e tradução informal.</small></article>
            <article><strong>Pedrinho</strong><small>Filho criança · inocência, literalidade e perguntas curiosas.</small></article>
          </div>
          <div class="story-source-note">Fonte interna: Família do Sertão — arquétipos V2. Estado: candidato narrativo não canônico.</div>
        </details>

        <details class="story-card compact">
          <summary>
            <div class="story-number">R02</div>
            <div>
              <span>MECÂNICA DA RESENHA</span>
              <h2>Participar, só assistir ou seguir o treino.</h2>
              <p>A Resenha continua opcional e não usa pressão para trazer ninguém de volta.</p>
              <b class="story-cta">VER REGRAS ${icon('arrow')}</b>
            </div>
          </summary>
          <div class="resenha-principles">
            <span>opt-in para exposição</span>
            <span>sem ranking humilhante</span>
            <span>sem FOMO artificial</span>
            <span>sem perder progresso por ausência</span>
            <span>silêncio é uma ação válida</span>
          </div>
        </details>
      </div>
    </section>
  `;
}

function render(): void {
  const app = document.getElementById('app');
  if (!app) return;
  const body =
    view === 'publicHome'
      ? publicHomeView()
      : view === 'publicCalisthenics'
        ? publicCalisthenicsView()
        : view === 'publicContent'
          ? publicContentView()
          : view === 'home'
            ? homeView()
            : view === 'workout'
              ? workoutView()
              : view === 'perception'
                ? perceptionView()
                : view === 'sofia'
                  ? sofiaView()
                  : view === 'evolution'
                    ? evolutionView()
                    : resenhaView();

  app.innerHTML = `
    <div class="app-shell">
      ${header()}
      <main class="content">${body}</main>
      ${nav()}
    </div>
  `;
  bindEvents();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bindEvents(): void {
  document.querySelectorAll<HTMLElement>('[data-action="enter-member"]').forEach(el => {
    el.addEventListener('click', async () => {
      mode = 'member';
      view = 'home';
      render();
      await refreshMotorState();
    });
  });

  document.querySelectorAll<HTMLElement>('[data-action="install-app"]').forEach(el => {
    el.addEventListener('click', async () => {
      if (installState === 'installed') return;
      if (!installPrompt) {
        installState = 'instructions';
        render();
        return;
      }
      const prompt = installPrompt;
      await prompt.prompt();
      const choice = await prompt.userChoice;
      installPrompt = null;
      installState = choice.outcome === 'accepted' ? 'installed' : 'instructions';
      render();
    });
  });

  document.querySelectorAll<HTMLElement>('[data-action="go-public"]').forEach(el => {
    el.addEventListener('click', () => {
      mode = 'public';
      view = 'publicHome';
      render();
    });
  });

  document.querySelectorAll<HTMLElement>('[data-nav]').forEach(el => {
    el.addEventListener('click', async () => {
      view = el.dataset.nav as View;
      render();
      if (mode === 'member' && (view === 'home' || view === 'evolution' || view === 'sofia' || view === 'workout')) {
        await refreshMotorState();
      }
    });
  });

  document.querySelectorAll<HTMLElement>('[data-action="open-workout"]').forEach(el => {
    el.addEventListener('click', async () => {
      selectedMuscle = 'Peitoral';
      view = 'workout';
      render();
      await refreshMotorState();
    });
  });

  document.querySelectorAll<HTMLElement>('[data-action="refresh-motor"]').forEach(el => {
    el.addEventListener('click', async () => {
      motorMessage = 'Atualizando contexto da NAVE...';
      render();
      await refreshMotorState();
    });
  });

  document.querySelectorAll<HTMLElement>('[data-muscle]').forEach(el => {
    el.addEventListener('click', () => {
      selectedMuscle = el.dataset.muscle as Muscle;
      if (selectedMuscle !== 'Peitoral') session = emptySession();
      view = 'workout';
      render();
    });
  });

  document.querySelectorAll<HTMLElement>('[data-set]').forEach(el => {
    el.addEventListener('click', async () => {
      const n = Number(el.dataset.set);
      if (session.completedSets.includes(n) || n !== session.completedSets.length + 1) return;
      const anchorTop = el.getBoundingClientRect().top;
      await completeRealSet(n);
      render();
      requestAnimationFrame(() => {
        const nextRow = document.querySelector<HTMLElement>('[data-set="' + n + '"]');
        if (!nextRow) return;
        const delta = nextRow.getBoundingClientRect().top - anchorTop;
        window.scrollBy({ top: delta, left: 0, behavior: 'auto' });
      });
    });
  });

  document.querySelectorAll<HTMLElement>('[data-action="finish-workout"]').forEach(el => {
    el.addEventListener('click', () => {
      if (session.completedSets.length === 3) {
        view = 'perception';
        render();
      }
    });
  });

  document.querySelectorAll<HTMLElement>('[data-perception]').forEach(el => {
    el.addEventListener('click', async () => {
      const perception = el.dataset.perception ?? '';
      try {
        await closeRealWorkout(perception);
        view = 'sofia';
      } catch {
        view = 'perception';
      }
      render();
    });
  });

  document.querySelectorAll<HTMLElement>('[data-action="reset-demo"]').forEach(el => {
    el.addEventListener('click', async () => {
      (['Peitoral', 'Costas', 'Pernas', 'Ombros', 'Bíceps', 'Tríceps'] as Muscle[]).forEach(muscle => localStorage.removeItem(storageKey(muscle)));
      selectedMuscle = 'Peitoral';
      session = emptySession();
      persist();
      view = 'home';
      render();
      await refreshMotorState();
    });
  });
}

render();
if (mode === 'member') refreshMotorState();
