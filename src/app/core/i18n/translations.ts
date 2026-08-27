export type Language = 'en' | 'it';

interface TranslationDictionary {
  common: {
    workspace: string;
    search: string;
    newProject: string;
    viewAll: string;
    settings: string;
    notifications: string;
    languageSelector: string;
    openMenu: string;
    closeMenu: string;
  };
  navigation: {
    dashboard: string;
    projects: string;
    clients: string;
    invoices: string;
    settings: string;
    mainNavigation: string;
    settingsNavigation: string;
    openProfile: string;
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
    editProject: string;
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

    form: {
      eyebrow: string;
      title: string;
      intro: string;

      editEyebrow: string;
      editTitle: string;
      editIntro: string;

      projectName: string;
      projectNamePlaceholder: string;

      client: string;
      clientPlaceholder: string;

      description: string;
      descriptionPlaceholder: string;

      status: string;
      dueDate: string;
      budget: string;

      requiredField: string;
      descriptionError: string;
      budgetError: string;

      cancel: string;
      create: string;
      save: string;
      close: string;
    };

    delete: {
      eyebrow: string;
      title: string;
      message: string;
      warning: string;
      cancel: string;
      confirm: string;
      open: string;
    };
  };
  clients: {
    eyebrow: string;
    title: string;
    intro: string;

    newClient: string;

    totalClients: string;
    activeClients: string;
    totalValue: string;

    searchPlaceholder: string;

    all: string;
    active: string;
    inactive: string;

    results: string;

    client: string;
    status: string;
    projects: string;
    value: string;
    lastContact: string;

    moreOptions: string;

    noClients: string;
    noClientsDescription: string;

    form: {
      eyebrow: string;
      title: string;
      intro: string;

      editEyebrow: string;
      editTitle: string;
      editIntro: string;

      name: string;
      namePlaceholder: string;

      company: string;
      companyPlaceholder: string;

      email: string;
      emailPlaceholder: string;

      status: string;
      lastContact: string;

      requiredField: string;
      emailError: string;

      cancel: string;
      create: string;
      save: string;
      close: string;
    };
    editClient: string;

    delete: {
      eyebrow: string;
      title: string;
      message: string;
      warning: string;
      cancel: string;
      confirm: string;
      open: string;
    };
    filterByStatus: string;
  };
  invoices: {
    eyebrow: string;
    title: string;
    intro: string;
    newInvoice: string;

    totalInvoices: string;
    paid: string;
    outstanding: string;
    revenue: string;

    searchPlaceholder: string;
    filterByStatus: string;

    editInvoice: string;
    deleteInvoice: string;

    emptyTitle: string;
    emptyText: string;

    summaryShowing: string;
    summaryOf: string;
    summaryInvoices: string;

    delete: {
      title: string;
      intro: string;
      warning: string;
      cancel: string;
      confirm: string;
    };

    filters: {
      all: string;
      draft: string;
      sent: string;
      paid: string;
      overdue: string;
    };

    table: {
      invoice: string;
      client: string;
      issued: string;
      dueDate: string;
      amount: string;
      status: string;
    };

    form: {
      createTitle: string;
      createIntro: string;
      editTitle: string;
      editIntro: string;

      client: string;
      selectClient: string;
      issueDate: string;
      dueDate: string;
      amount: string;
      status: string;

      cancel: string;
      create: string;
      save: string;

      required: string;
      invalidAmount: string;
      invalidDateRange: string;
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
      notifications: 'Notifications',
      languageSelector: 'Language selector',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
    },
    navigation: {
      dashboard: 'Dashboard',
      projects: 'Projects',
      clients: 'Clients',
      invoices: 'Invoices',
      settings: 'Settings',
      mainNavigation: 'Main navigation',
      settingsNavigation: 'Settings',
      openProfile: 'Open profile',
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
      editProject: 'Edit project',
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

      form: {
        eyebrow: 'New project',
        title: 'Create a project',
        intro:
          'Add the essential project details. You can update progress and other information later.',

        editEyebrow: 'Edit project',
        editTitle: 'Update project',
        editIntro: 'Review and update the project information.',

        projectName: 'Project name',
        projectNamePlaceholder: 'e.g. Atlas Website',

        client: 'Client',
        clientPlaceholder: 'e.g. Atlas Studio',

        description: 'Description',
        descriptionPlaceholder: 'Briefly describe the project and its main objectives...',

        status: 'Status',
        dueDate: 'Due date',
        budget: 'Budget',

        requiredField: 'This field is required.',
        descriptionError: 'Enter a description of at least 10 characters.',
        budgetError: 'Enter a valid budget.',

        cancel: 'Cancel',
        create: 'Create project',
        save: 'Save changes',
        close: 'Close form',
      },

      delete: {
        eyebrow: 'Delete project',
        title: 'Are you sure?',
        message: 'You are about to delete',
        warning: 'This action cannot be undone.',
        cancel: 'Cancel',
        confirm: 'Delete project',
        open: 'Delete project',
      },
    },
    clients: {
      eyebrow: 'Workspace',
      title: 'Clients',
      intro: 'Keep track of client relationships, projects and overall business value.',

      newClient: 'New client',

      totalClients: 'Total clients',
      activeClients: 'Active clients',
      totalValue: 'Client value',

      searchPlaceholder: 'Search clients, companies or email...',

      all: 'All',
      active: 'Active',
      inactive: 'Inactive',

      results: 'clients',

      client: 'Client',
      status: 'Status',
      projects: 'Projects',
      value: 'Value',
      lastContact: 'Last contact',

      moreOptions: 'More client options',

      noClients: 'No clients found',
      noClientsDescription: 'Try changing your search or selecting another status.',

      form: {
        eyebrow: 'New client',
        title: 'Add a client',
        intro: 'Add the essential contact information and relationship status.',

        editEyebrow: 'Edit client',
        editTitle: 'Update client',
        editIntro: 'Review and update the client information.',

        name: 'Client name',
        namePlaceholder: 'e.g. Laura Bianchi',

        company: 'Company',
        companyPlaceholder: 'e.g. Atlas Studio',

        email: 'Email',
        emailPlaceholder: 'e.g. laura@atlasstudio.it',

        status: 'Status',
        lastContact: 'Last contact',

        requiredField: 'This field is required.',
        emailError: 'Enter a valid email address.',

        cancel: 'Cancel',
        create: 'Create client',
        save: 'Save changes',
        close: 'Close form',
      },
      editClient: 'Edit client',

      delete: {
        eyebrow: 'Delete client',
        title: 'Are you sure?',
        message: 'You are about to delete',
        warning: 'This action cannot be undone.',
        cancel: 'Cancel',
        confirm: 'Delete client',
        open: 'Delete client',
      },
      filterByStatus: 'Filter clients by status',
    },
    invoices: {
      eyebrow: 'Invoices',
      title: 'Manage your invoices',
      intro:
        'Track payments, monitor outstanding balances and keep your billing workflow under control.',
      newInvoice: 'New invoice',

      totalInvoices: 'Total invoices',
      paid: 'Paid',
      outstanding: 'Outstanding',
      revenue: 'Revenue',

      searchPlaceholder: 'Search invoices...',
      filterByStatus: 'Filter invoices by status',

      summaryShowing: 'Showing',
      summaryOf: 'of',
      summaryInvoices: 'invoices',

      editInvoice: 'Edit invoice',
      deleteInvoice: 'Delete invoice',

      emptyTitle: 'No invoices found',
      emptyText: 'Try changing your search or filters.',

      delete: {
        title: 'Delete invoice',
        intro: 'Are you sure you want to delete this invoice?',
        warning: 'This action cannot be undone and the invoice will be permanently removed.',
        cancel: 'Cancel',
        confirm: 'Delete invoice',
      },

      filters: {
        all: 'All',
        draft: 'Draft',
        sent: 'Sent',
        paid: 'Paid',
        overdue: 'Overdue',
      },

      table: {
        invoice: 'Invoice',
        client: 'Client',
        issued: 'Issued',
        dueDate: 'Due date',
        amount: 'Amount',
        status: 'Status',
      },

      form: {
        createTitle: 'New invoice',
        createIntro: 'Create a new invoice and add it to your billing workflow.',

        editTitle: 'Edit invoice',
        editIntro: 'Update the invoice details and payment status.',

        client: 'Client',
        selectClient: 'Select a client',
        issueDate: 'Issue date',
        dueDate: 'Due date',
        amount: 'Amount',
        status: 'Status',

        cancel: 'Cancel',
        create: 'Create invoice',
        save: 'Save changes',

        required: 'This field is required.',
        invalidAmount: 'Enter an amount greater than zero.',
        invalidDateRange: 'The due date cannot be earlier than the issue date.',
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
      notifications: 'Notifiche',
      languageSelector: 'Selettore lingua',
      openMenu: 'Apri il menu di navigazione',
      closeMenu: 'Chiudi il menu di navigazione',
    },
    navigation: {
      dashboard: 'Dashboard',
      projects: 'Progetti',
      clients: 'Clienti',
      invoices: 'Fatture',
      settings: 'Impostazioni',
      mainNavigation: 'Navigazione principale',
      settingsNavigation: 'Impostazioni',
      openProfile: 'Apri il profilo',
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
      editProject: 'Modifica progetto',
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

      form: {
        eyebrow: 'Nuovo progetto',
        title: 'Crea un progetto',
        intro:
          'Inserisci le informazioni essenziali del progetto. Potrai aggiornare avanzamento e altri dettagli in seguito.',

        editEyebrow: 'Modifica progetto',
        editTitle: 'Aggiorna progetto',
        editIntro: 'Rivedi e aggiorna le informazioni del progetto.',

        projectName: 'Nome progetto',
        projectNamePlaceholder: 'es. Sito Atlas',

        client: 'Cliente',
        clientPlaceholder: 'es. Atlas Studio',

        description: 'Descrizione',
        descriptionPlaceholder: 'Descrivi brevemente il progetto e i suoi obiettivi principali...',

        status: 'Stato',
        dueDate: 'Scadenza',
        budget: 'Budget',

        requiredField: 'Questo campo è obbligatorio.',
        descriptionError: 'Inserisci una descrizione di almeno 10 caratteri.',
        budgetError: 'Inserisci un budget valido.',

        cancel: 'Annulla',
        create: 'Crea progetto',
        save: 'Salva modifiche',
        close: 'Chiudi il modulo',
      },

      delete: {
        eyebrow: 'Elimina progetto',
        title: 'Sei sicuro?',
        message: 'Stai per eliminare',
        warning: 'Questa azione non può essere annullata.',
        cancel: 'Annulla',
        confirm: 'Elimina progetto',
        open: 'Elimina progetto',
      },
    },
    clients: {
      eyebrow: 'Area di lavoro',
      title: 'Clienti',
      intro: 'Gestisci relazioni, progetti e valore complessivo dei tuoi clienti.',

      newClient: 'Nuovo cliente',

      totalClients: 'Clienti totali',
      activeClients: 'Clienti attivi',
      totalValue: 'Valore clienti',

      searchPlaceholder: 'Cerca clienti, aziende o email...',

      all: 'Tutti',
      active: 'Attivi',
      inactive: 'Inattivi',

      results: 'clienti',

      client: 'Cliente',
      status: 'Stato',
      projects: 'Progetti',
      value: 'Valore',
      lastContact: 'Ultimo contatto',

      moreOptions: 'Altre opzioni cliente',

      noClients: 'Nessun cliente trovato',
      noClientsDescription: 'Prova a modificare la ricerca o a selezionare un altro stato.',

      form: {
        eyebrow: 'Nuovo cliente',
        title: 'Aggiungi un cliente',
        intro: 'Inserisci le informazioni essenziali di contatto e lo stato della relazione.',

        editEyebrow: 'Modifica cliente',
        editTitle: 'Aggiorna cliente',
        editIntro: 'Rivedi e aggiorna le informazioni del cliente.',

        name: 'Nome cliente',
        namePlaceholder: 'es. Laura Bianchi',

        company: 'Azienda',
        companyPlaceholder: 'es. Atlas Studio',

        email: 'Email',
        emailPlaceholder: 'es. laura@atlasstudio.it',

        status: 'Stato',
        lastContact: 'Ultimo contatto',

        requiredField: 'Questo campo è obbligatorio.',
        emailError: 'Inserisci un indirizzo email valido.',

        cancel: 'Annulla',
        create: 'Crea cliente',
        save: 'Salva modifiche',
        close: 'Chiudi il modulo',
      },
      editClient: 'Modifica cliente',

      delete: {
        eyebrow: 'Elimina cliente',
        title: 'Sei sicuro?',
        message: 'Stai per eliminare',
        warning: 'Questa azione non può essere annullata.',
        cancel: 'Annulla',
        confirm: 'Elimina cliente',
        open: 'Elimina cliente',
      },
      filterByStatus: 'Filtra i clienti per stato',
    },
    invoices: {
      eyebrow: 'Fatture',
      title: 'Gestisci le tue fatture',
      intro:
        'Tieni sotto controllo pagamenti, importi da incassare e l’intero flusso di fatturazione.',
      newInvoice: 'Nuova fattura',

      totalInvoices: 'Fatture totali',
      paid: 'Pagate',
      outstanding: 'Da incassare',
      revenue: 'Incassato',

      searchPlaceholder: 'Cerca fatture...',
      filterByStatus: 'Filtra le fatture per stato',

      summaryShowing: 'Mostrate',
      summaryOf: 'di',
      summaryInvoices: 'fatture',

      editInvoice: 'Modifica fattura',
      deleteInvoice: 'Elimina fattura',

      emptyTitle: 'Nessuna fattura trovata',
      emptyText: 'Prova a modificare la ricerca o i filtri.',

      delete: {
        title: 'Elimina fattura',
        intro: 'Sei sicuro di voler eliminare questa fattura?',
        warning:
          'Questa azione non può essere annullata e la fattura verrà eliminata definitivamente.',
        cancel: 'Annulla',
        confirm: 'Elimina fattura',
      },

      filters: {
        all: 'Tutte',
        draft: 'Bozza',
        sent: 'Inviate',
        paid: 'Pagate',
        overdue: 'Scadute',
      },

      table: {
        invoice: 'Fattura',
        client: 'Cliente',
        issued: 'Emissione',
        dueDate: 'Scadenza',
        amount: 'Importo',
        status: 'Stato',
      },

      form: {
        createTitle: 'Nuova fattura',
        createIntro: 'Crea una nuova fattura e aggiungila al tuo flusso di fatturazione.',

        editTitle: 'Modifica fattura',
        editIntro: 'Aggiorna i dati della fattura e lo stato del pagamento.',

        client: 'Cliente',
        selectClient: 'Seleziona un cliente',
        issueDate: 'Data di emissione',
        dueDate: 'Data di scadenza',
        amount: 'Importo',
        status: 'Stato',

        cancel: 'Annulla',
        create: 'Crea fattura',
        save: 'Salva modifiche',

        required: 'Questo campo è obbligatorio.',
        invalidAmount: 'Inserisci un importo maggiore di zero.',
        invalidDateRange: 'La scadenza non può precedere la data di emissione.',
      },
    },
  },
};
