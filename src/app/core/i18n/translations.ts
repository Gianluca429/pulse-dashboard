export type Language = 'en' | 'it';

interface TranslationDictionary {
  common: {
    workspace: string;
    search: string;
    newProject: string;
    viewAll: string;
    settings: string;
  };

  navigation: {
    dashboard: string;
    projects: string;
    clients: string;
    invoices: string;
    settings: string;
  };

  profile: {
    role: string;
  };

  dashboard: {
    overview: string;
    greeting: string;
    previousPeriod: string;
    thisMonth: string;

    revenue: string;
    activeProjects: string;
    clients: string;
    completionRate: string;

    performance: string;
    lastSixMonths: string;

    schedule: string;
    upcoming: string;

    projects: string;
    recentProjects: string;
    viewAllProjects: string;

    project: string;
    status: string;
    progress: string;
    dueDate: string;

    inProgress: string;
    review: string;
    completed: string;

    clientReview: string;
    homepageDelivery: string;
    kickoffMeeting: string;

    meeting: string;
    delivery: string;
  };

  projects: {
    eyebrow: string;
    title: string;
    intro: string;

    searchPlaceholder: string;
    filterByStatus: string;

    all: string;
    planning: string;
    inProgress: string;
    review: string;
    completed: string;

    results: string;
    progress: string;
    deadline: string;
    budget: string;

    openProject: string;
    moreOptions: string;

    noProjects: string;
    noProjectsDescription: string;

    descriptions: {
      lumaWebsite: string;
      northDashboard: string;
      miraCommerce: string;
      arcoIdentity: string;
      novaCrm: string;
      formaJournal: string;
    };
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    common: {
      workspace: 'Workspace',
      search: 'Search...',
      newProject: 'New project',
      viewAll: 'View all',
      settings: 'Settings',
    },

    navigation: {
      dashboard: 'Dashboard',
      projects: 'Projects',
      clients: 'Clients',
      invoices: 'Invoices',
      settings: 'Settings',
    },

    profile: {
      role: 'Freelancer',
    },

    dashboard: {
      overview: 'Overview',
      greeting: 'Good evening, Gianluca.',
      previousPeriod: 'vs previous period',
      thisMonth: 'this month',

      revenue: 'Revenue',
      activeProjects: 'Active projects',
      clients: 'Clients',
      completionRate: 'Completion rate',

      performance: 'Performance',
      lastSixMonths: 'Last 6 months',

      schedule: 'Schedule',
      upcoming: 'Upcoming',

      projects: 'Projects',
      recentProjects: 'Recent projects',
      viewAllProjects: 'View all projects',

      project: 'Project',
      status: 'Status',
      progress: 'Progress',
      dueDate: 'Due date',

      inProgress: 'In progress',
      review: 'Review',
      completed: 'Completed',

      clientReview: 'Client review',
      homepageDelivery: 'Homepage delivery',
      kickoffMeeting: 'Kickoff meeting',

      meeting: 'Meeting',
      delivery: 'Delivery',
    },

    projects: {
      eyebrow: 'Workspace',
      title: 'Projects',
      intro: 'Manage active work, deadlines and project progress from one place.',

      searchPlaceholder: 'Search projects or clients...',
      filterByStatus: 'Filter projects by status',

      all: 'All',
      planning: 'Planning',
      inProgress: 'In progress',
      review: 'Review',
      completed: 'Completed',

      results: 'projects',
      progress: 'Progress',
      deadline: 'Deadline',
      budget: 'Budget',

      openProject: 'Open project',
      moreOptions: 'More project options',

      noProjects: 'No projects found',
      noProjectsDescription: 'Try changing your search or selecting another status.',

      descriptions: {
        lumaWebsite: 'Corporate website redesign and front-end development.',
        northDashboard: 'Analytics dashboard for internal business operations.',
        miraCommerce: 'E-commerce experience for a contemporary lifestyle brand.',
        arcoIdentity: 'Digital implementation of the new brand identity.',
        novaCrm: 'Lightweight CRM interface for client and lead management.',
        formaJournal: 'Editorial area for architecture news and selected projects.',
      },
    },
  },

  it: {
    common: {
      workspace: 'Area di lavoro',
      search: 'Cerca...',
      newProject: 'Nuovo progetto',
      viewAll: 'Vedi tutto',
      settings: 'Impostazioni',
    },

    navigation: {
      dashboard: 'Dashboard',
      projects: 'Progetti',
      clients: 'Clienti',
      invoices: 'Fatture',
      settings: 'Impostazioni',
    },

    profile: {
      role: 'Freelance',
    },

    dashboard: {
      overview: 'Panoramica',
      greeting: 'Buonasera, Gianluca.',
      previousPeriod: 'rispetto al periodo precedente',
      thisMonth: 'questo mese',

      revenue: 'Fatturato',
      activeProjects: 'Progetti attivi',
      clients: 'Clienti',
      completionRate: 'Tasso di completamento',

      performance: 'Andamento',
      lastSixMonths: 'Ultimi 6 mesi',

      schedule: 'Agenda',
      upcoming: 'Prossime scadenze',

      projects: 'Progetti',
      recentProjects: 'Progetti recenti',
      viewAllProjects: 'Tutti i progetti',

      project: 'Progetto',
      status: 'Stato',
      progress: 'Avanzamento',
      dueDate: 'Scadenza',

      inProgress: 'In corso',
      review: 'Revisione',
      completed: 'Completato',

      clientReview: 'Revisione cliente',
      homepageDelivery: 'Consegna homepage',
      kickoffMeeting: 'Riunione di kickoff',

      meeting: 'Riunione',
      delivery: 'Consegna',
    },

    projects: {
      eyebrow: 'Area di lavoro',
      title: 'Progetti',
      intro: 'Gestisci attività, scadenze e avanzamento dei progetti da un unico spazio.',

      searchPlaceholder: 'Cerca progetti o clienti...',
      filterByStatus: 'Filtra i progetti per stato',

      all: 'Tutti',
      planning: 'Pianificazione',
      inProgress: 'In corso',
      review: 'Revisione',
      completed: 'Completati',

      results: 'progetti',
      progress: 'Avanzamento',
      deadline: 'Scadenza',
      budget: 'Budget',

      openProject: 'Apri progetto',
      moreOptions: 'Altre opzioni progetto',

      noProjects: 'Nessun progetto trovato',
      noProjectsDescription: 'Prova a modificare la ricerca o a selezionare un altro stato.',

      descriptions: {
        lumaWebsite: 'Restyling del sito corporate e sviluppo front-end.',
        northDashboard: 'Dashboard analitica per la gestione delle attività interne.',
        miraCommerce: 'Esperienza e-commerce per un brand lifestyle contemporaneo.',
        arcoIdentity: 'Implementazione digitale della nuova identità del brand.',
        novaCrm: 'Interfaccia CRM leggera per la gestione di clienti e lead.',
        formaJournal: 'Area editoriale dedicata a news di architettura e progetti selezionati.',
      },
    },
  },
};
