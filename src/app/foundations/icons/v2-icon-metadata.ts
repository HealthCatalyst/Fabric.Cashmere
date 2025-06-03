/* eslint-disable no-useless-escape */
export interface IconLibraryEntry {
    name: string;
    icon: string;
    description?: string;
    keywords: string[];
    category: string;
    unicode: string;
}

export interface IconCategory {
    name: string;
    icons: IconLibraryEntry[];
    count: number;
}

export const ICON_OPTIONS: Array<IconLibraryEntry> = [
    {
        name: 'add',
        icon: 'icon-add',
        description: 'Use to indicate the action of adding or creating something',
        keywords: ['plus', 'create', 'new'],
        category: 'ui',
        unicode: '\e900'
    },
    {
        name: 'ambulance',
        icon: 'icon-ambulance',
        description: 'Use to represent emergency medical services or urgent medical transportation',
        keywords: ['emergency', 'medical', 'healthcare'],
        category: 'medical',
        unicode: '\e901'
    },
    {
        name: 'analytics',
        icon: 'icon-analytics',
        description: 'Use to represent data analysis or insights',
        keywords: ['data', 'analysis', 'insights'],
        category: 'data & analytics',
        unicode: '\e902'
    },
    {
        name: 'anchor',
        icon: 'icon-anchor',
        description: 'Use to represent stability, grounding, or maritime-related concepts',
        keywords: ['marine', 'ship', 'boat'],
        category: 'other symbols',
        unicode: '\e903'
    },
    {
        name: 'app card',
        icon: 'icon-app-card',
        description: 'Use to represent an application card or tile',
        keywords: ['application', 'card', 'tile'],
        category: 'ui',
        unicode: '\e904'
    },
    {
        name: 'apple',
        icon: 'icon-apple',
        description: 'Use to represent health, nutrition, or educational concepts',
        keywords: ['fruit', 'food', 'healthy'],
        category: 'other symbols',
        unicode: '\e905'
    },
    {
        name: 'archive',
        icon: 'icon-archive',
        description: 'Use to represent archiving, removing, or retiring an item but keeping it recoverable',
        keywords: ['storage', 'files', 'soft delete'],
        category: 'files & folders',
        unicode: '\e906'
    },
    {
        name: 'arrow-down',
        icon: 'icon-arrow-down',
        description: 'Use to indicate downward movement or decreasing values',
        keywords: ['movement', 'direction', 'down'],
        category: 'arrows',
        unicode: '\e908'
    },
    {
        name: 'arrow-left',
        icon: 'icon-arrow-left',
        description: 'Use to indicate leftward movement or navigation to previous items',
        keywords: ['movement', 'direction', 'left'],
        category: 'arrows',
        unicode: '\e90a'
    },
    {
        name: 'arrow-right',
        icon: 'icon-arrow-right',
        description: 'Use to indicate rightward movement or navigation to next items',
        keywords: ['movement', 'direction', 'right'],
        category: 'arrows',
        unicode: '\e90c'
    },
    {
        name: 'arrow-up',
        icon: 'icon-arrow-up',
        description: 'Use to indicate upward movement or increasing values',
        keywords: ['movement', 'direction', 'up'],
        category: 'arrows',
        unicode: '\e910'
    },
    {
        name: 'arrow-down-alt',
        icon: 'icon-arrow-down-alt',
        description: 'Alternative style arrow icon to indicate downward movement or decreasing values',
        keywords: ['movement', 'direction', 'down'],
        category: 'arrows',
        unicode: '\e907'
    },
    {
        name: 'arrow-left-alt',
        icon: 'icon-arrow-left-alt',
        description: 'Alternative style arrow icon to indicate leftward movement or previous navigation',
        keywords: ['movement', 'direction', 'left'],
        category: 'arrows',
        unicode: '\e909'
    },
    {
        name: 'arrow-right-alt',
        icon: 'icon-arrow-right-alt',
        description: 'Alternative style arrow icon to indicate rightward movement or next navigation',
        keywords: ['movement', 'direction', 'right'],
        category: 'arrows',
        unicode: '\e90b'
    },
    {
        name: 'arrow-up-alt',
        icon: 'icon-arrow-up-alt',
        description: 'Alternative style arrow icon to indicate upward movement or increasing values',
        keywords: ['movement', 'direction', 'up'],
        category: 'arrows',
        unicode: '\e90f'
    },
    {
        name: 'arrow-turn-down-left',
        icon: 'icon-arrow-turn-down-left',
        description: 'Use to indicate a return or back action with a downward emphasis',
        keywords: ['movement', 'direction', 'down-left'],
        category: 'arrows',
        unicode: '\e90d'
    },
    {
        name: 'arrow-turn-down-right',
        icon: 'icon-arrow-turn-down-right',
        description: 'Use to indicate drilling down or going deeper into a specific area',
        keywords: ['movement', 'direction', 'enter'],
        category: 'arrows',
        unicode: '\e90e'
    },
    {
        name: 'atom',
        icon: 'icon-atom',
        description: 'Use to represent scientific concepts, research, or atomic/molecular structures',
        keywords: ['science', 'molecule', 'ai'],
        category: 'medical',
        unicode: '\e911'
    },
    {
        name: 'avg',
        icon: 'icon-avg',
        description: 'Use to represent average or mean values in data analysis',
        keywords: ['average', 'mean', 'data'],
        category: 'data & analytics',
        unicode: '\e912'
    },
    {
        name: 'baby-carriage',
        icon: 'icon-baby-carriage',
        description: 'Use to represent childcare, pediatrics, or family-related concepts',
        keywords: ['baby', 'child', 'parenting'],
        category: 'other symbols',
        unicode: '\e913'
    },
    {
        name: 'bacterium',
        icon: 'icon-bacterium',
        description: 'Use to represent microbiology, infection, or bacterial concepts in healthcare',
        keywords: ['bacteria', 'germs', 'microorganism'],
        category: 'medical',
        unicode: '\e914'
    },
    {
        name: 'ban',
        icon: 'icon-ban',
        description: 'Use to indicate a disabled action, or a logical exclusion',
        keywords: ['exclude', 'forbid', 'disabled'],
        category: 'ui',
        unicode: '\e915'
    },
    {
        name: 'baseball-field',
        icon: 'icon-baseball-field',
        description: 'Use to represent sports facilities or athletic venues',
        keywords: ['sports', 'play', 'game'],
        category: 'other symbols',
        unicode: '\e916'
    },
    {
        name: 'baseball',
        icon: 'icon-baseball',
        description: 'Use to represent sports, games, or recreational activities',
        keywords: ['sports', 'play', 'game'],
        category: 'other symbols',
        unicode: '\e917'
    },
    {
        name: 'bed-pulse',
        icon: 'icon-bed-pulse',
        description: 'Use to represent patient monitoring or vital signs in a medical setting',
        keywords: ['hospital', 'medical', 'vitals'],
        category: 'medical',
        unicode: '\e918'
    },
    {
        name: 'bed',
        icon: 'icon-bed',
        description: 'Use to represent hospital beds, inpatient care, or accommodation',
        keywords: ['hospital', 'patient', 'sleep'],
        category: 'medical',
        unicode: '\e919'
    },
    {
        name: 'bell-o',
        icon: 'icon-bell-o',
        description: 'Use to represent a notification',
        keywords: ['notifications', 'alert', 'reminder'],
        category: 'ui',
        unicode: '\e91a'
    },
    {
        name: 'bell-slash',
        icon: 'icon-bell-slash',
        description: 'Use to indicate notification(s) that are muted or disabled',
        keywords: ['notifications', 'mute', 'disabled'],
        category: 'ui',
        unicode: '\e91b'
    },
    {
        name: 'bell',
        icon: 'icon-bell',
        description: 'Use to represent a notification',
        keywords: ['notifications', 'alert', 'reminder'],
        category: 'ui',
        unicode: '\e91c'
    },
    {
        name: 'bicycle',
        icon: 'icon-bicycle',
        description: 'Use to represent transportation, fitness, or recreational activities',
        keywords: ['transportation', 'bike', 'exercise'],
        category: 'other symbols',
        unicode: '\e91d'
    },
    {
        name: 'biohazard',
        icon: 'icon-biohazard',
        description: 'Use to represent biological hazards or dangerous medical materials',
        keywords: ['hazard', 'danger', 'warning'],
        category: 'medical',
        unicode: '\e91e'
    },
    {
        name: 'bolt',
        icon: 'icon-bolt',
        description: 'Use to represent energy, power, or quick actions',
        keywords: ['speed', 'power', 'action'],
        category: 'nature',
        unicode: '\e91f'
    },
    {
        name: 'bone',
        icon: 'icon-bone',
        description: 'Use to represent orthopedics, skeletal system, or bone-related medical concepts',
        keywords: ['anatomy', 'healthcare', 'skeleton'],
        category: 'medical',
        unicode: '\e920'
    },
    {
        name: 'book-bookmark',
        icon: 'icon-book-bookmark',
        description: 'Use to represent saved documentation, guides, or educational materials',
        keywords: ['read', 'education', 'docs'],
        category: 'ui',
        unicode: '\e921'
    },
    {
        name: 'book',
        icon: 'icon-book',
        description: 'Use to represent documentation, guides, or educational materials',
        keywords: ['read', 'education', 'docs'],
        category: 'ui',
        unicode: '\e922'
    },
    {
        name: 'bookmark',
        icon: 'icon-bookmark',
        description: 'Use to represent saved items or important references',
        keywords: ['save', 'mark', 'education'],
        category: 'ui',
        unicode: '\e923'
    },
    {
        name: 'brain',
        icon: 'icon-brain',
        description: 'Use to represent neurology, mental health, or cognitive functions',
        keywords: ['anatomy', 'healthcare', 'smart'],
        category: 'medical',
        unicode: '\e924'
    },
    {
        name: 'bridge',
        icon: 'icon-bridge',
        description: 'Use to represent connections, infrastructure, or linking concepts',
        keywords: ['construction', 'connect', 'structure'],
        category: 'other symbols',
        unicode: '\e925'
    },
    {
        name: 'brush',
        icon: 'icon-brush',
        description: 'Use to represent customization, design, or artistic tools',
        keywords: ['art', 'design', 'paint'],
        category: 'tools',
        unicode: '\e926'
    },
    {
        name: 'bug',
        icon: 'icon-bug',
        description: 'Use to represent software issues, defects, or system problems',
        keywords: ['error', 'issue', 'problem'],
        category: 'nature',
        unicode: '\e927'
    },
    {
        name: 'building-columns',
        icon: 'icon-building-columns',
        description: 'Use to represent institutions, organizations, or official buildings',
        keywords: ['library', 'building', 'structure'],
        category: 'other symbols',
        unicode: '\e928'
    },
    {
        name: 'building',
        icon: 'icon-building',
        description: 'Use to represent businesses, offices, or physical locations',
        keywords: ['structure', 'office', 'company'],
        category: 'other symbols',
        unicode: '\e929'
    },
    {
        name: 'bullhorn',
        icon: 'icon-bullhorn',
        description: 'Use to represent an announcement or alert',
        keywords: ['announcement', 'information', 'alert'],
        category: 'other symbols',
        unicode: '\e92a'
    },
    {
        name: 'cake',
        icon: 'icon-cake',
        description: 'Use to represent a birthday/birthdate',
        keywords: ['birthday', 'celebration', 'dessert'],
        category: 'other symbols',
        unicode: '\e92b'
    },
    {
        name: 'calculate',
        icon: 'icon-calculate',
        description: 'Use to represent calculation or math',
        keywords: ['math', 'numbers', 'science'],
        category: 'data & analytics',
        unicode: '\e92c'
    },
    {
        name: 'calendar-clock-add',
        icon: 'icon-calendar-clock-add',
        description: 'Use to represent scheduling or adding an event',
        keywords: ['time', 'schedule', 'event'],
        category: 'date & time',
        unicode: '\e92d'
    },
    {
        name: 'calendar-clock',
        icon: 'icon-calendar-clock',
        description: 'Use to represent a date and time',
        keywords: ['datetime', 'schedule', 'event'],
        category: 'date & time',
        unicode: '\e92e'
    },
    {
        name: 'calendar-edit',
        icon: 'icon-calendar-edit',
        description: 'Use to represent editing a scheduled event',
        keywords: ['schedule', 'event', 'edit'],
        category: 'date & time',
        unicode: '\e92f'
    },
    {
        name: 'calendar-heart',
        icon: 'icon-calendar-heart',
        description: 'Use to represent a special date, also a measure of type "episode"',
        keywords: ['episode', 'date', 'event'],
        category: 'date & time',
        unicode: '\e930'
    },
    {
        name: 'calendar',
        icon: 'icon-calendar',
        description: 'Use to represent a date or event',
        keywords: ['date', 'event', 'schedule'],
        category: 'date & time',
        unicode: '\e931'
    },
    {
        name: 'camera',
        icon: 'icon-camera',
        description: 'Use to represent image capture, photography, or visual media',
        keywords: ['photography', 'photo', 'image'],
        category: 'other symbols',
        unicode: '\e932'
    },
    {
        name: 'car',
        icon: 'icon-car',
        description: 'Use to represent transportation, travel, or automotive concepts',
        keywords: ['vehicle', 'transportation', 'drive'],
        category: 'other symbols',
        unicode: '\e933'
    },
    {
        name: 'caret-down',
        icon: 'icon-caret-down',
        description: 'Use for minimal dropdowns',
        keywords: ['dropdown', 'expand', 'direction'],
        category: 'arrows',
        unicode: '\e934'
    },
    {
        name: 'caret-left',
        icon: 'icon-caret-left',
        description: 'Use for minimal navigation elements pointing left',
        keywords: ['direction', 'left', 'arrow'],
        category: 'arrows',
        unicode: '\e935'
    },
    {
        name: 'caret-right',
        icon: 'icon-caret-right',
        description: 'Use for minimal navigation elements pointing right',
        keywords: ['direction', 'right', 'arrow'],
        category: 'arrows',
        unicode: '\e936'
    },
    {
        name: 'caret-up',
        icon: 'icon-caret-up',
        description: 'Use for minimal navigation elements pointing up',
        keywords: ['direction', 'up', 'arrow'],
        category: 'arrows',
        unicode: '\e937'
    },
    {
        name: 'change-orientation-bottom',
        icon: 'icon-change-orientation-bottom',
        description: 'Use to represent changing layout orientation to bottom alignment',
        keywords: ['rotate', 'reorient', 'bottom'],
        category: 'vitalware',
        unicode: '\e938'
    },
    {
        name: 'change-orientation-side',
        icon: 'icon-change-orientation-side',
        description: 'Use to represent changing layout orientation to side alignment',
        keywords: ['rotate', 'reorient', 'side'],
        category: 'vitalware',
        unicode: '\e939'
    },
    {
        name: 'chart-area',
        icon: 'icon-chart-area',
        description: 'Use to represent area charts or cumulative data visualization',
        keywords: ['analytics', 'data', 'visualization'],
        category: 'data & analytics',
        unicode: '\e93a'
    },
    {
        name: 'chart-bar-horiz',
        icon: 'icon-chart-bar-horiz',
        description: 'Use to represent horizontal bar charts or comparative data visualization',
        keywords: ['analytics', 'data', 'visualization'],
        category: 'data & analytics',
        unicode: '\e93b'
    },
    {
        name: 'chart-bar-simple',
        icon: 'icon-chart-bar-simple',
        description: 'Use to represent basic bar charts or simple data visualization',
        keywords: ['analytics', 'data', 'visualization'],
        category: 'data & analytics',
        unicode: '\e93c'
    },
    {
        name: 'chart-bar',
        icon: 'icon-chart-bar',
        description: 'Use to represent bar charts or categorical data visualization',
        keywords: ['analytics', 'data', 'visualization'],
        category: 'data & analytics',
        unicode: '\e93d'
    },
    {
        name: 'chart-line-down',
        icon: 'icon-chart-line-down',
        description: 'Use to represent declining trends or negative data visualization',
        keywords: ['analytics', 'data', 'visualization'],
        category: 'data & analytics',
        unicode: '\e93e'
    },
    {
        name: 'chart-line',
        icon: 'icon-chart-line',
        description: 'Use to represent line charts or trend visualization',
        keywords: ['analytics', 'data', 'visualization'],
        category: 'data & analytics',
        unicode: '\e93f'
    },
    {
        name: 'chart-pie',
        icon: 'icon-chart-pie',
        description: 'Use to represent pie charts or part-to-whole data visualization',
        keywords: ['analytics', 'data', 'visualization'],
        category: 'data & analytics',
        unicode: '\e940'
    },
    {
        name: 'chart-scatter',
        icon: 'icon-chart-scatter',
        description: 'Use to represent a scatter plot data visualization',
        keywords: ['analytics', 'data', 'visualization'],
        category: 'data & analytics',
        unicode: '\e941'
    },
    {
        name: 'check',
        icon: 'icon-check',
        description: 'Use to represent a success state or completed task',
        keywords: ['checkmark', 'ok', 'success'],
        category: 'status',
        unicode: '\e942'
    },
    {
        name: 'chev-double-down',
        icon: 'icon-chev-double-down',
        description: 'Use to indicate moving an item to the bottom of a list',
        keywords: ['direction', 'down', 'arrow'],
        category: 'arrows',
        unicode: '\e943'
    },
    {
        name: 'chev-double-left',
        icon: 'icon-chev-double-left',
        description: 'Use to indicate moving an item to the start of a list',
        keywords: ['direction', 'left', 'arrow'],
        category: 'arrows',
        unicode: '\e944'
    },
    {
        name: 'chev-double-right',
        icon: 'icon-chev-double-right',
        description: 'Use to indicate skipping or moving an item to the end of a list',
        keywords: ['direction', 'right', 'arrow'],
        category: 'arrows',
        unicode: '\e945'
    },
    {
        name: 'chev-double-up',
        icon: 'icon-chev-double-up',
        description: 'Use to indicate moving an item to the top of a list',
        keywords: ['direction', 'up', 'arrow'],
        category: 'arrows',
        unicode: '\e946'
    },
    {
        name: 'chev-down',
        icon: 'icon-chev-down',
        description: 'Use for select boxes, dropdowns, and accordions',
        keywords: ['direction', 'down', 'arrow'],
        category: 'arrows',
        unicode: '\e947'
    },
    {
        name: 'chev-left',
        icon: 'icon-chev-left',
        description: 'Use to indicate moving back to the previous screen',
        keywords: ['direction', 'left', 'arrow'],
        category: 'arrows',
        unicode: '\e948'
    },
    {
        name: 'chev-right',
        icon: 'icon-chev-right',
        description: 'Use for breadrumbs, and at the end of links to indicate moving to another screen',
        keywords: ['direction', 'right', 'arrow'],
        category: 'arrows',
        unicode: '\e949'
    },
    {
        name: 'chev-up',
        icon: 'icon-chev-up',
        description: 'Use for open accordions and other similar elements',
        keywords: ['direction', 'up', 'arrow'],
        category: 'arrows',
        unicode: '\e94a'
    },
    {
        name: 'circle-cancelled',
        icon: 'icon-circle-cancelled',
        description: 'Use to represent an inactive or cancelled state',
        keywords: ['status', 'inactive', 'cancelled'],
        category: 'status',
        unicode: '\e94b'
    },
    {
        name: 'circle-check-ast',
        icon: 'icon-circle-check-ast',
        description: 'Use to represent an ammended success state',
        keywords: ['status', 'success', 'checkmark'],
        category: 'status',
        unicode: '\e94c'
    },
    {
        name: 'circle-check-o',
        icon: 'icon-circle-check-o',
        description: 'Use to represent a success state',
        keywords: ['status', 'success', 'checkmark'],
        category: 'status',
        unicode: '\e94d'
    },
    {
        name: 'circle-check',
        icon: 'icon-circle-check',
        description: 'Use to represent a success state',
        keywords: ['status', 'success', 'checkmark'],
        category: 'status',
        unicode: '\e94e'
    },
    {
        name: 'circle-close',
        icon: 'icon-circle-close',
        description: 'Use for closing or removing items',
        keywords: ['deactivate', 'remove', 'cancel'],
        category: 'status',
        unicode: '\e94f'
    },
    {
        name: 'circle-exclamation-ast',
        icon: 'icon-circle-exclamation-ast',
        description: 'Use to represent an ammended warning/failure state',
        keywords: ['status', 'warning', 'error'],
        category: 'status',
        unicode: '\e950'
    },
    {
        name: 'circle-exclamation',
        icon: 'icon-circle-exclamation',
        description: 'Use to represent a warning or error state',
        keywords: ['status', 'warning', 'error'],
        category: 'status',
        unicode: '\e952'
    },
    {
        name: 'circle-exclamation-o',
        icon: 'icon-circle-exclamation-o',
        description: 'Use to represent a warning or error state',
        keywords: ['status', 'warning', 'error'],
        category: 'status',
        unicode: '\e951'
    },
    {
        name: 'circle-minus-o',
        icon: 'icon-circle-minus-o',
        description: 'Use to represent zooming out or removing an item',
        keywords: ['remove', 'zoom out', 'subtract'],
        category: 'status',
        unicode: '\e953'
    },
    {
        name: 'circle-minus',
        icon: 'icon-circle-minus',
        description: 'Use to represent zooming out or removing an item',
        keywords: ['remove', 'zoom out', 'subtract'],
        category: 'status',
        unicode: '\e954'
    },
    {
        name: 'circle-plus-o',
        icon: 'icon-circle-plus-o',
        description: 'Use to represent zooming in or adding an item',
        keywords: ['add', 'zoom in', 'create'],
        category: 'status',
        unicode: '\e955'
    },
    {
        name: 'circle-plus',
        icon: 'icon-circle-plus',
        description: 'Use to represent zooming in or adding an item',
        keywords: ['add', 'zoom in', 'create'],
        category: 'status',
        unicode: '\e956'
    },
    {
        name: 'circle-processing',
        icon: 'icon-circle-processing',
        description: 'Use to represent a busy or processing state',
        keywords: ['status', 'busy', 'loading'],
        category: 'status',
        unicode: '\e957'
    },
    {
        name: 'circle-queued',
        icon: 'icon-circle-queued',
        description: 'Use to represent a queued or waiting state',
        keywords: ['status', 'waiting', 'paused'],
        category: 'status',
        unicode: '\e958'
    },
    {
        name: 'circle-skipped',
        icon: 'icon-circle-skipped',
        description: 'Use to represent a skipped or ignored state',
        keywords: ['status', 'missed', 'jumped'],
        category: 'status',
        unicode: '\e959'
    },
    {
        name: 'circle-warn',
        icon: 'icon-circle-warn',
        description: 'Use to represent a warning state',
        keywords: ['status', 'issue', 'alert'],
        category: 'status',
        unicode: '\e95a'
    },
    {
        name: 'city',
        icon: 'icon-city',
        description: 'Use to represent a metro area',
        keywords: ['urban', 'town', 'metropolis'],
        category: 'other symbols',
        unicode: '\e95b'
    },
    {
        name: 'clipboard-assign',
        icon: 'icon-clipboard-assign',
        description: 'Use to represent assigning or allocating items or tasks',
        keywords: ['allocate', 'task', 'work'],
        category: 'clipboards & lists',
        unicode: '\e95c'
    },
    {
        name: 'clipboard-check',
        icon: 'icon-clipboard-check',
        description: 'Use to represent a completed task or approved item',
        keywords: ['sucess', 'done', 'checkmark'],
        category: 'clipboards & lists',
        unicode: '\e95d'
    },
    {
        name: 'clipboard-elip',
        icon: 'icon-clipboard-elip',
        description: 'Use to represent a work item in process',
        keywords: ['pending', 'working', 'options'],
        category: 'clipboards & lists',
        unicode: '\e95e'
    },
    {
        name: 'clipboard-exclamation',
        icon: 'icon-clipboard-exclamation',
        description: 'Use to represent a work item in an error or warning state',
        keywords: ['failure', 'task', 'alert'],
        category: 'clipboards & lists',
        unicode: '\e95f'
    },
    {
        name: 'clipboard-heart',
        icon: 'icon-clipboard-heart',
        description: 'Use to represent a favorite or medical related work item',
        keywords: ['task', 'favorite', 'healthcare'],
        category: 'clipboards & lists',
        unicode: '\e960'
    },
    {
        name: 'clipboard-list',
        icon: 'icon-clipboard-list',
        description: 'Use to represent detailed information, note taking, or a task list',
        keywords: ['tasks', 'details', 'checklist'],
        category: 'clipboards & lists',
        unicode: '\e961'
    },
    {
        name: 'clipboard-medical-alt',
        icon: 'icon-clipboard-medical-alt',
        description: 'Use to represent diagnosis, medical notes, or medical work items',
        keywords: ['task', 'notes', 'healthcare'],
        category: 'medical',
        unicode: '\e962'
    },
    {
        name: 'clipboard-medical',
        icon: 'icon-clipboard-medical',
        description: 'Use to represent diagnosis, medical notes, or medical work items',
        keywords: ['task', 'notes', 'healthcare'],
        category: 'medical',
        unicode: '\e963'
    },
    {
        name: 'clipboard-search',
        icon: 'icon-clipboard-search',
        description: 'Use to represent reviewing work items',
        keywords: ['task', 'review'],
        category: 'clipboards & lists',
        unicode: '\e964'
    },
    {
        name: 'clipboard-text',
        icon: 'icon-clipboard-text',
        description: 'Use to represent detailed information or note taking',
        keywords: ['tasks', 'details', 'checklist'],
        category: 'clipboards & lists',
        unicode: '\e965'
    },
    {
        name: 'clipboard',
        icon: 'icon-clipboard',
        description: 'Use to represent detailed information, note taking, or a task',
        keywords: ['tasks', 'details', 'checklist'],
        category: 'clipboards & lists',
        unicode: '\e966'
    },
    {
        name: 'clock-add',
        icon: 'icon-clock-add',
        description: 'Use to represent adding a time, schedule, or event',
        keywords: ['time', 'create', 'event'],
        category: 'date & time',
        unicode: '\e967'
    },
    {
        name: 'clock-edit',
        icon: 'icon-clock-edit',
        description: 'Use to represent managing a time, schedule, or event',
        keywords: ['time', 'change', 'event'],
        category: 'date & time',
        unicode: '\e968'
    },
    {
        name: 'clock-slash',
        icon: 'icon-clock-slash',
        description: 'Use to represent a disabled time, schedule, or event',
        keywords: ['time', 'disabled', 'event'],
        category: 'date & time',
        unicode: '\e969'
    },
    {
        name: 'clock',
        icon: 'icon-clock',
        description: 'Use to represent a time, schedule, or event',
        keywords: ['time', 'event', 'schedule'],
        category: 'date & time',
        unicode: '\e96a'
    },
    {
        name: 'clone',
        icon: 'icon-clone',
        description: 'Use for creating a copy of items',
        keywords: ['copy', 'duplicate', 'replicate'],
        category: 'ui',
        unicode: '\e96b'
    },
    {
        name: 'close',
        icon: 'icon-close',
        description: 'Use to represent closing, canceling, or removing items',
        keywords: ['times', 'cancel', 'remove'],
        category: 'ui',
        unicode: '\e96c'
    },
    {
        name: 'cloud',
        icon: 'icon-cloud',
        description: 'Use to represent cloud computing, storage, or weather concepts',
        keywords: ['storage', 'data', 'cloudy'],
        category: 'nature',
        unicode: '\e96d'
    },
    {
        name: 'code',
        icon: 'icon-code',
        description: 'Use to represent programming, development, or source code',
        keywords: ['html', 'programming', 'development'],
        category: 'ui',
        unicode: '\e96e'
    },
    {
        name: 'cog',
        icon: 'icon-cog',
        description: 'Use to represent settings or configuration',
        keywords: ['gear', 'settings', 'config'],
        category: 'ui',
        unicode: '\e96f'
    },
    {
        name: 'cogs',
        icon: 'icon-cogs',
        description: 'Use to represent settings, configuration, or a processing status',
        keywords: ['gears', 'settings', 'config'],
        category: 'ui',
        unicode: '\e970'
    },
    {
        name: 'comment-alt',
        icon: 'icon-comment-alt',
        description: 'Use to represent messaging, comments, or communication',
        keywords: ['message', 'chat', 'text'],
        category: 'ui',
        unicode: '\e971'
    },
    {
        name: 'comment',
        icon: 'icon-comment',
        description: 'Use to represent messaging, comments, or communication',
        keywords: ['message', 'chat', 'text'],
        category: 'ui',
        unicode: '\e972'
    },
    {
        name: 'comments',
        icon: 'icon-comments',
        description: 'Use to represent multiple messages or group communication',
        keywords: ['messages', 'chat', 'text'],
        category: 'ui',
        unicode: '\e973'
    },
    {
        name: 'compare',
        icon: 'icon-compare',
        description: 'Use to represent comparison or analysis between items',
        keywords: ['analyze', 'contrast'],
        category: 'arrows',
        unicode: '\e974'
    },
    {
        name: 'compass',
        icon: 'icon-compass',
        description: 'Use to represent navigation, direction, or exploration',
        keywords: ['navigation', 'direction', 'explore'],
        category: 'other symbols',
        unicode: '\e975'
    },
    {
        name: 'compress',
        icon: 'icon-compress',
        description: 'Use to represent minimizing, collapsing, or compressing content',
        keywords: ['minimize', 'collapse', 'compress'],
        category: 'arrows',
        unicode: '\e976'
    },
    {
        name: 'construction',
        icon: 'icon-construction',
        description: 'Use to represent work in progress, maintenance, or development',
        keywords: ['barrier', 'block', 'warning'],
        category: 'other symbols',
        unicode: '\e977'
    },
    {
        name: 'contacts',
        icon: 'icon-contacts',
        description: 'Use to represent contact information, addresses, or directory listings',
        keywords: ['address', 'directory', 'people'],
        category: 'ui',
        unicode: '\e978'
    },
    {
        name: 'copy',
        icon: 'icon-copy',
        description: 'Use to represent duplicating, copying, or replicating items',
        keywords: ['duplicate', 'clone', 'replicate'],
        category: 'files & folders',
        unicode: '\e979'
    },
    {
        name: 'count',
        icon: 'icon-count',
        description: 'Use to represent counting or tallying items',
        keywords: ['numbers', '123', 'numeric'],
        category: 'data & analytics',
        unicode: '\e97a'
    },
    {
        name: 'crown',
        icon: 'icon-crown',
        description: 'Use to represent royalty, leadership, or high status',
        keywords: ['king', 'queen', 'royalty'],
        category: 'other symbols',
        unicode: '\e97b'
    },
    {
        name: 'crutch',
        icon: 'icon-crutch',
        description: 'Use to represent medical assistance, support, or recovery',
        keywords: ['healthcare', 'medical', 'injury'],
        category: 'medical',
        unicode: '\e97c'
    },
    {
        name: 'cube',
        icon: 'icon-cube',
        description: 'Use to represent components of EDCs (HCAT data models)',
        keywords: ['model', 'block', 'design'],
        category: 'data & analytics',
        unicode: '\e97d'
    },
    {
        name: 'cubes',
        icon: 'icon-cubes',
        description: 'Use to represent an EDC (HCAT data model)',
        keywords: ['model', 'blocks', 'design'],
        category: 'data & analytics',
        unicode: '\e97e'
    },
    {
        name: 'data-mart-entry',
        icon: 'icon-data-mart-entry',
        description: 'Use to represent data entry, and IDEA (Ignite Data Entry Apps) in particular',
        keywords: ['database', 'input'],
        category: 'data & analytics',
        unicode: '\e97f'
    },
    {
        name: 'data-mart-lock',
        icon: 'icon-data-mart-lock',
        description: 'Use to represent secure data storage, access control, or permissions',
        keywords: ['database', 'secure', 'permissions'],
        category: 'data & analytics',
        unicode: '\e980'
    },
    {
        name: 'data-mart',
        icon: 'icon-data-mart',
        description: 'Use to represent data marts in the Ignite ecosystem',
        keywords: ['database', 'storage'],
        category: 'data & analytics',
        unicode: '\e981'
    },
    {
        name: 'data-profiling',
        icon: 'icon-data-profiling',
        description: 'Use to represent data analysis, monitoring, or quality assurance',
        keywords: ['analytics', 'monitoring'],
        category: 'data & analytics',
        unicode: '\e982'
    },
    {
        name: 'data-source-add',
        icon: 'icon-data-source-add',
        description: 'Use to represent adding a new data source connection',
        keywords: ['database', 'ingestion', 'create'],
        category: 'data & analytics',
        unicode: '\e983'
    },
    {
        name: 'data-source-edit',
        icon: 'icon-data-source-edit',
        description: 'Use to representing editing or managing a data source connection',
        keywords: ['database', 'ingestion', 'modify'],
        category: 'data & analytics',
        unicode: '\e984'
    },
    {
        name: 'data-source',
        icon: 'icon-data-source',
        description: 'Use to represent data source connections, particularly in the context of data ingestion',
        keywords: ['database', 'ingestion', 'ETL'],
        category: 'data & analytics',
        unicode: '\e985'
    },
    {
        name: 'database-add',
        icon: 'icon-database-add',
        description: 'Use to represent adding a new data source or connection',
        keywords: ['data', 'storage', 'create'],
        category: 'data & analytics',
        unicode: '\e986'
    },
    {
        name: 'database-edit',
        icon: 'icon-database-edit',
        description: 'Use to represent editing or modifying a data source connection',
        keywords: ['data', 'storage', 'modify'],
        category: 'data & analytics',
        unicode: '\e987'
    },
    {
        name: 'database-lock',
        icon: 'icon-database-lock',
        description: 'Use to represent secure data storage, access control, or permissions',
        keywords: ['data', 'storage', 'secure'],
        category: 'data & analytics',
        unicode: '\e988'
    },
    {
        name: 'database-search',
        icon: 'icon-database-search',
        description: 'Use to represent searching or querying data sources',
        keywords: ['data', 'storage', 'query'],
        category: 'data & analytics',
        unicode: '\e989'
    },
    {
        name: 'database-solid',
        icon: 'icon-database-solid',
        description: 'Use to represent a solid data source or database',
        keywords: ['data', 'storage', 'source'],
        category: 'data & analytics',
        unicode: '\e98a'
    },
    {
        name: 'database-user',
        icon: 'icon-database-user',
        description: 'Use to represent database users, administrators, or stewards',
        keywords: ['data', 'steward', 'manager'],
        category: 'data & analytics',
        unicode: '\e98b'
    },
    {
        name: 'database',
        icon: 'icon-database',
        description: 'Use to represent a database or data storage system. ',
        keywords: ['data', 'storage', 'source'],
        category: 'data & analytics',
        unicode: '\e98c'
    },
    {
        name: 'databricks',
        icon: 'icon-databricks',
        description: 'This icon represents Databricks, a cloud-based data platform',
        keywords: ['dbx', 'platform'],
        category: 'data & analytics',
        unicode: '\e98d'
    },
    {
        name: 'desktop',
        icon: 'icon-desktop',
        description: 'Use to represent a desktop computer or workstation',
        keywords: ['computer', 'workspace', 'office'],
        category: 'data & analytics',
        unicode: '\e98e'
    },
    {
        name: 'diagram-alt',
        icon: 'icon-diagram-alt',
        description: 'Use to represent a flowchart or process diagram',
        keywords: ['flow', 'process', 'visualization'],
        category: 'data & analytics',
        unicode: '\e98f'
    },
    {
        name: 'diagram',
        icon: 'icon-diagram',
        description: 'Use to represent a flowchart or process diagram',
        keywords: ['flow', 'process', 'visualization'],
        category: 'data & analytics',
        unicode: '\e990'
    },
    {
        name: 'diamond',
        icon: 'icon-diamond',
        description: 'Use to represent advanced features, premium content, or valuable items',
        keywords: ['advanced', 'premium', 'gem'],
        category: 'other symbols',
        unicode: '\e991'
    },
    {
        name: 'disconnected',
        icon: 'icon-disconnected',
        description: 'Use to represent network issues, offline status, or broken connections',
        keywords: ['offline', 'error', 'broken'],
        category: 'data & analytics',
        unicode: '\e992'
    },
    {
        name: 'doctor',
        icon: 'icon-doctor',
        description: 'Use to represent medical professionals, healthcare providers, or physicians',
        keywords: ['nurse', 'user', 'MD'],
        category: 'medical',
        unicode: '\e993'
    },
    {
        name: 'doctors',
        icon: 'icon-doctors',
        description: 'Use to represent multiple medical professionals or healthcare teams',
        keywords: ['nurses', 'users', 'MDs'],
        category: 'medical',
        unicode: '\e994'
    },
    {
        name: 'dollar',
        icon: 'icon-dollar',
        description: 'Use to represent currency, financial matters, or monetary values',
        keywords: ['money', 'currency', 'finance'],
        category: 'other symbols',
        unicode: '\e995'
    },
    {
        name: 'dove',
        icon: 'icon-dove',
        description: 'Use to represent peace, freedom, or spiritual concepts',
        keywords: ['bird', 'peace', 'animal'],
        category: 'nature',
        unicode: '\e996'
    },
    {
        name: 'download',
        icon: 'icon-download',
        description: 'Use to represent downloading, saving, or obtaining files',
        keywords: ['export', 'extract', 'save'],
        category: 'arrows',
        unicode: '\e997'
    },
    {
        name: 'droplet',
        icon: 'icon-droplet',
        description: 'Use to represent liquids, water, or color selection',
        keywords: ['water', 'liquid', 'purity'],
        category: 'nature',
        unicode: '\e998'
    },
    {
        name: 'earth',
        icon: 'icon-earth',
        description: 'Use to represent global concepts, world-wide scope, or environmental themes',
        keywords: ['planet', 'globe', 'world'],
        category: 'nature',
        unicode: '\e999'
    },
    {
        name: 'ellipses-v',
        icon: 'icon-ellipses-v',
        description: 'Use for menus with additional actions or options',
        keywords: ['menu', 'options', 'vertical'],
        category: 'ui',
        unicode: '\e99a'
    },
    {
        name: 'ellipses',
        icon: 'icon-ellipses',
        description: 'Use for menus with additional actions or options',
        keywords: ['menu', 'options', 'horizontal'],
        category: 'ui',
        unicode: '\e99b'
    },
    {
        name: 'email',
        icon: 'icon-email',
        description: 'Use to represent email, communication, or contact information',
        keywords: ['message', 'communication', 'contact'],
        category: 'ui',
        unicode: '\e99d'
    },
    {
        name: 'email-o',
        icon: 'icon-email-o',
        description: 'Use to represent email or message that has been read',
        keywords: ['email', 'read', 'communication'],
        category: 'ui',
        unicode: '\e99c'
    },
    {
        name: 'empty',
        icon: 'icon-empty',
        description: 'Use to represent an empty state or no data',
        keywords: ['blank', 'missing', 'not found'],
        category: 'ui',
        unicode: '\e99e'
    },
    {
        name: 'error',
        icon: 'icon-error',
        description: 'Use to represent an error or issue',
        keywords: ['alert', 'issue', 'problem'],
        category: 'status',
        unicode: '\e99f'
    },
    {
        name: 'expand',
        icon: 'icon-expand',
        description: 'Use to represent expanding or maximizing a window',
        keywords: ['maximize', 'fullscreen'],
        category: 'arrows',
        unicode: '\e9a0'
    },
    {
        name: 'external-link',
        icon: 'icon-external-link',
        description: 'Use to represent a link to an external resource',
        keywords: ['navigate', 'website', 'hyperlink'],
        category: 'arrows',
        unicode: '\e9a1'
    },
    {
        name: 'eye-slash',
        icon: 'icon-eye-slash',
        description: 'Use to represent a hidden or invisible item',
        keywords: ['hidden', 'invisible', 'private'],
        category: 'ui',
        unicode: '\e9a2'
    },
    {
        name: 'eye',
        icon: 'icon-eye',
        description: 'Use to represent a visible or visible item',
        keywords: ['visible', 'see', 'view'],
        category: 'ui',
        unicode: '\e9a3'
    },
    {
        name: 'fan',
        icon: 'icon-fan',
        description: 'Use to represent a support system or fan base',
        keywords: ['sports', 'cheer', 'support'],
        category: 'other symbols',
        unicode: '\e9a4'
    },
    {
        name: 'feather',
        icon: 'icon-feather',
        description: 'Use to represent a feather or light, soft item',
        keywords: ['bird', 'light', 'soft'],
        category: 'nature',
        unicode: '\e9a5'
    },
    {
        name: 'field',
        icon: 'icon-field',
        description: 'Use to represent data fields, form inputs, or database columns',
        keywords: ['data', 'column', 'attribute'],
        category: 'data & analytics',
        unicode: '\e9a6'
    },
    {
        name: 'file-lines',
        icon: 'icon-file-lines',
        description: 'Use to represent text documents or files with content',
        keywords: ['document', 'text', 'content'],
        category: 'files & folders',
        unicode: '\e9a7'
    },
    {
        name: 'file',
        icon: 'icon-file',
        description: 'Use to represent generic files or documents',
        keywords: ['document', 'attachment', 'information'],
        category: 'files & folders',
        unicode: '\e9a8'
    },
    {
        name: 'filters',
        icon: 'icon-filters',
        description: 'Use to represent filters for a data grid or table',
        keywords: ['sliders', 'settings', 'refine'],
        category: 'ui',
        unicode: '\e9a9'
    },
    {
        name: 'fire',
        icon: 'icon-fire',
        description: 'Use to represent trending items, hot topics, or emergency situations',
        keywords: ['heat', 'flame', 'burn'],
        category: 'nature',
        unicode: '\e9aa'
    },
    {
        name: 'fish',
        icon: 'icon-fish',
        description: 'Use to represent a fish, aquatic life, or seafood',
        keywords: ['fish', 'aquatic', 'seafood'],
        category: 'nature',
        unicode: '\e9ab'
    },
    {
        name: 'flag',
        icon: 'icon-flag',
        description: 'Use to represent notifications, markers, or important items',
        keywords: ['issue', 'milestone', 'banner'],
        category: 'other symbols',
        unicode: '\e9ac'
    },
    {
        name: 'folder-bookmark',
        icon: 'icon-folder-bookmark',
        description: 'In a measures context, this icon represent a measures program',
        keywords: ['program', 'collection', 'directory'],
        category: 'files & folders',
        unicode: '\e9ad'
    },
    {
        name: 'folder-home',
        icon: 'icon-folder-home',
        description: 'This icon represents a home folder or directory',
        keywords: ['directory', 'user home'],
        category: 'files & folders',
        unicode: '\e9ae'
    },
    {
        name: 'folder-move',
        icon: 'icon-folder-move',
        description: 'Use to represent moving or transferring a folder',
        keywords: ['directory', 'transfer', 'relocate'],
        category: 'files & folders',
        unicode: '\e9af'
    },
    {
        name: 'folder-new',
        icon: 'icon-folder-new',
        description: 'Use to represent creating a new folder',
        keywords: ['directory', 'create'],
        category: 'files & folders',
        unicode: '\e9b0'
    },
    {
        name: 'folder-open',
        icon: 'icon-folder-open',
        description: 'This icon can be used to represent an empty state',
        keywords: ['directory', 'empty', 'missing'],
        category: 'files & folders',
        unicode: '\e9b1'
    },
    {
        name: 'folder-shared',
        icon: 'icon-folder-shared',
        description: 'Use to represent a shared folder or directory',
        keywords: ['directory', 'collaborate'],
        category: 'files & folders',
        unicode: '\e9b2'
    },
    {
        name: 'folder-shortcut',
        icon: 'icon-folder-shortcut',
        description: 'Use to represent a folder shortcut or linked directory',
        keywords: ['directory', 'symlink'],
        category: 'files & folders',
        unicode: '\e9b3'
    },
    {
        name: 'folder-tree',
        icon: 'icon-folder-tree',
        description: 'Use to represent a file hierarchy',
        keywords: ['directory', 'hierarchy', 'file structure'],
        category: 'files & folders',
        unicode: '\e9b4'
    },
    {
        name: 'folder-user',
        icon: 'icon-folder-user',
        description: 'Use to represent a user-owned folder',
        keywords: ['directory', 'home'],
        category: 'files & folders',
        unicode: '\e9b5'
    },
    {
        name: 'folder',
        icon: 'icon-folder',
        description: 'Use to represent directories, collections, or file organization',
        keywords: ['directory', 'files', 'documents'],
        category: 'files & folders',
        unicode: '\e9b6'
    },
    {
        name: 'formula',
        icon: 'icon-formula',
        description: 'Use to represent mathematical equations, calculations, or formulas',
        keywords: ['math', 'calculation', 'equation'],
        category: 'data & analytics',
        unicode: '\e9b7'
    },
    {
        name: 'fullscreen-enter',
        icon: 'icon-fullscreen-enter',
        description: 'Use to represent entering fullscreen mode or maximizing a window',
        keywords: ['expand', 'maximize'],
        category: 'ui',
        unicode: '\e9b8'
    },
    {
        name: 'fullscreen-exit',
        icon: 'icon-fullscreen-exit',
        description: 'Use to represent exiting fullscreen mode or restoring window size',
        keywords: ['collapse', 'minimize'],
        category: 'ui',
        unicode: '\e9b9'
    },
    {
        name: 'funnel',
        icon: 'icon-funnel',
        description: 'Use to represent filtering, refining, or narrowing down results',
        keywords: ['filter', 'refine'],
        category: 'tools',
        unicode: '\e9ba'
    },
    {
        name: 'gauge',
        icon: 'icon-gauge',
        description: 'Use to represent a measure or performance metric',
        keywords: ['speed', 'performance', 'measure'],
        category: 'data & analytics',
        unicode: '\e9bb'
    },
    {
        name: 'gem',
        icon: 'icon-gem',
        description: 'Use to represent premium features, valuable items, or high-quality content',
        keywords: ['jewel', 'precious', 'valuable'],
        category: 'other symbols',
        unicode: '\e9bc'
    },
    {
        name: 'genome',
        icon: 'icon-genome',
        description: 'Use to represent genetic information, DNA analysis, or genomic data',
        keywords: ['DNA', 'genetics', 'biology'],
        category: 'medical',
        unicode: '\e9bd'
    },
    {
        name: 'gift',
        icon: 'icon-gift',
        description: 'Use to represent new software features or updates',
        keywords: ['present', 'new', 'features'],
        category: 'other symbols',
        unicode: '\e9be'
    },
    {
        name: 'globe-checkmark',
        icon: 'icon-globe-checkmark',
        description: 'Use to represent a global or public status',
        keywords: ['global', 'public', 'published'],
        category: 'ui',
        unicode: '\e9bf'
    },
    {
        name: 'globe-up-arrow',
        icon: 'icon-globe-up-arrow',
        description: 'Use to represent the action of publishing or sharing an item globally',
        keywords: ['global', 'publish', 'share'],
        category: 'ui',
        unicode: '\e9c0'
    },
    {
        name: 'globe',
        icon: 'icon-globe',
        description: 'Use to represent a global or public location',
        keywords: ['global', 'public', 'published'],
        category: 'ui',
        unicode: '\e9c1'
    },
    {
        name: 'goal',
        icon: 'icon-goal',
        description: 'Use to represent a target or objective',
        keywords: ['target', 'objective'],
        category: 'other symbols',
        unicode: '\e9c2'
    },
    {
        name: 'grad',
        icon: 'icon-grad',
        description: 'Use to represent learning, expert knowledge, or academic achievement',
        keywords: ['gradution', 'education', 'expert'],
        category: 'other symbols',
        unicode: '\e9c3'
    },
    {
        name: 'grid-sm',
        icon: 'icon-grid-sm',
        description: 'Use to represent a compact grid view or small thumbnail layout',
        keywords: ['categories', 'apps'],
        category: 'ui',
        unicode: '\e9c4'
    },
    {
        name: 'grid',
        icon: 'icon-grid',
        description: 'Use to to represent the app switcher',
        keywords: ['categories', 'apps'],
        category: 'ui',
        unicode: '\e9c5'
    },
    {
        name: 'grip-resize',
        icon: 'icon-grip-resize',
        description: 'Use on elements that can be resized',
        keywords: ['drag', 'handle'],
        category: 'ui',
        unicode: '\e9c6'
    },
    {
        name: 'grip',
        icon: 'icon-grip',
        description: 'Use on elements that can be move or reordered via drag and drop functionality',
        keywords: ['drag', 'handle', 'move'],
        category: 'ui',
        unicode: '\e9c7'
    },
    {
        name: 'group',
        icon: 'icon-group',
        description: 'Use to represent teams, user groups, or collaborative settings',
        keywords: ['users', 'people', 'team'],
        category: 'users',
        unicode: '\e9c8'
    },
    {
        name: 'guitar',
        icon: 'icon-guitar',
        description: 'Use to represent music, entertainment, or artistic activities',
        keywords: ['music', 'instrument', 'strings'],
        category: 'other symbols',
        unicode: '\e9c9'
    },
    {
        name: 'hamburger',
        icon: 'icon-hamburger',
        description: 'Use to represent menu navigation or food-related content',
        keywords: ['menu', 'food', 'meal'],
        category: 'other symbols',
        unicode: '\e9ca'
    },
    {
        name: 'hammer',
        icon: 'icon-hammer',
        description: 'Use to represent tools, construction, or system maintenance',
        keywords: ['tool', 'construction', 'repair'],
        category: 'tools',
        unicode: '\e9cb'
    },
    {
        name: 'hand-holding-heart',
        icon: 'icon-hand-holding-heart',
        description: 'Use to represent care and compassion',
        keywords: ['healthcare', 'support', 'charity'],
        category: 'medical',
        unicode: '\e9cc'
    },
    {
        name: 'hand-holding-plus',
        icon: 'icon-hand-holding-plus',
        description: 'Use to represent support and growth',
        keywords: ['healthcare', 'support', 'medical'],
        category: 'medical',
        unicode: '\e9cd'
    },
    {
        name: 'handshake',
        icon: 'icon-handshake',
        description: 'Use to represent agreement, cooperation, or partnership',
        keywords: ['agreement', 'cooperate', 'partnership'],
        category: 'other symbols',
        unicode: '\e9ce'
    },
    {
        name: 'hdd',
        icon: 'icon-hdd',
        description: 'Use to represent storage devices, hard drives, or system resources',
        keywords: ['storage', 'system', 'computer'],
        category: 'data & analytics',
        unicode: '\e9cf'
    },
    {
        name: 'headphones',
        icon: 'icon-headphones',
        description: 'Use to represent audio, sound, or listening devices',
        keywords: ['audio', 'sound', 'support'],
        category: 'other symbols',
        unicode: '\e9d0'
    },
    {
        name: 'heart-exclamation',
        icon: 'icon-heart-exclamation',
        description: 'In a measures context, this icon represents a care gap',
        keywords: ['healthcare', 'alert', 'warning'],
        category: 'medical',
        unicode: '\e9d1'
    },
    {
        name: 'heart-o',
        icon: 'icon-heart-o',
        description: 'Use to represent a favorite item',
        keywords: ['healthcare', 'medical', 'cardiology'],
        category: 'medical',
        unicode: '\e9d2'
    },
    {
        name: 'heart-plus',
        icon: 'icon-heart-plus',
        description: 'In a measures context, this icon represents a closed care gap',
        keywords: ['healthcare', 'support', 'medical'],
        category: 'medical',
        unicode: '\e9d3'
    },
    {
        name: 'heart',
        icon: 'icon-heart',
        description: 'Use to represent a favorite item',
        keywords: ['healthcare', 'medical', 'cardiology'],
        category: 'medical',
        unicode: '\e9d4'
    },
    {
        name: 'help',
        icon: 'icon-help',
        description: 'Use to represent contextual help',
        keywords: ['information', 'details', 'guidance'],
        category: 'ui',
        unicode: '\e9d5'
    },
    {
        name: 'highlighter-line',
        icon: 'icon-highlighter-line',
        description: 'Use to suggest findings, evidence, or research',
        keywords: ['evidence', 'mark', 'pen'],
        category: 'tools',
        unicode: '\e9d6'
    },
    {
        name: 'history',
        icon: 'icon-history',
        description: 'Use to represent a timeline, past, or record',
        keywords: ['timeline', 'past', 'record'],
        category: 'arrows',
        unicode: '\e9d7'
    },
    {
        name: 'home',
        icon: 'icon-home',
        description: 'Could represent a home page, dashboard, or landing page',
        keywords: ['house', 'building', 'residence'],
        category: 'ui',
        unicode: '\e9d8'
    },
    {
        name: 'hospital-alt',
        icon: 'icon-hospital-alt',
        description: 'Use to represent a hospital, medical center, or healthcare facility',
        keywords: ['healthcare', 'medical', 'facility'],
        category: 'medical',
        unicode: '\e9d9'
    },
    {
        name: 'hospital',
        icon: 'icon-hospital',
        description: 'Use to represent a hospital, medical center, or healthcare facility',
        keywords: ['healthcare', 'medical', 'facility'],
        category: 'medical',
        unicode: '\e9da'
    },
    {
        name: 'id-badge',
        icon: 'icon-id-badge',
        description: 'In a security context, this icon represents a user role',
        keywords: ['role', 'profile'],
        category: 'users',
        unicode: '\e9db'
    },
    {
        name: 'image',
        icon: 'icon-image',
        description: 'Use to represent a picture, photo, or graphic',
        keywords: ['picture', 'photo', 'graphic'],
        category: 'ui',
        unicode: '\e9dc'
    },
    {
        name: 'import-file',
        icon: 'icon-import-file',
        description: 'Use to represent importing a file or data',
        keywords: ['upload', 'data', 'transform'],
        category: 'files & folders',
        unicode: '\e9dd'
    },
    {
        name: 'info',
        icon: 'icon-info',
        description: 'Use for contextual help',
        keywords: ['information', 'details', 'help'],
        category: 'ui',
        unicode: '\e9de'
    },
    {
        name: 'key',
        icon: 'icon-key',
        description: 'Use to represent security or access controls',
        keywords: ['security', 'access', 'permissions'],
        category: 'ui',
        unicode: '\e9df'
    },
    {
        name: 'keyboard',
        icon: 'icon-keyboard',
        description: 'Use to represent a keyboard, input, or typing',
        keywords: ['input', 'typing', 'computer'],
        category: 'data & analytics',
        unicode: '\e9e0'
    },
    {
        name: 'lab',
        icon: 'icon-lab',
        description: 'Use to represent medical lab tests',
        keywords: ['microscope', 'science', 'research'],
        category: 'medical',
        unicode: '\e9e1'
    },
    {
        name: 'laptop',
        icon: 'icon-laptop',
        description: 'Use to represent a computer, device, or software',
        keywords: ['computer', 'app', 'software'],
        category: 'data & analytics',
        unicode: '\e9e2'
    },
    {
        name: 'layers',
        icon: 'icon-layers',
        description: 'Use to represent a stack of layers, levels, or hierarchy',
        keywords: ['stack', 'levels', 'hierarchy'],
        category: 'ui',
        unicode: '\e9e3'
    },
    {
        name: 'life-saver',
        icon: 'icon-life-saver',
        description: 'Use to represent a life-saving device, medical emergency, or rescue operation',
        keywords: ['healthcare', 'medical', 'rescue'],
        category: 'medical',
        unicode: '\e9e4'
    },
    {
        name: 'lightbulb',
        icon: 'icon-lightbulb',
        description: 'Use to represent an idea, insight, or new concept',
        keywords: ['idea', 'insight', 'new'],
        category: 'other symbols',
        unicode: '\e9e5'
    },
    {
        name: 'link',
        icon: 'icon-link',
        description: 'Use to represent a hyperlink, connection, or reference',
        keywords: ['hyperlink', 'connect', 'reference'],
        category: 'ui',
        unicode: '\e9e6'
    },
    {
        name: 'list-alt',
        icon: 'icon-list-alt',
        description: 'Use to represent a list of tasks or information',
        keywords: ['tasks', 'details', 'checklist'],
        category: 'clipboards & lists',
        unicode: '\e9e7'
    },
    {
        name: 'list-bolt',
        icon: 'icon-list-bolt',
        description: 'Use in an IDEA context to represent a quick list',
        keywords: ['tasks', 'details', 'checklist'],
        category: 'clipboards & lists',
        unicode: '\e9e8'
    },
    {
        name: 'list-search',
        icon: 'icon-list-search',
        description: 'Use to represent searching throught a data set',
        keywords: ['discovery', 'query', 'search'],
        category: 'clipboards & lists',
        unicode: '\e9e9'
    },
    {
        name: 'list',
        icon: 'icon-list',
        description: 'Use to represent a list of tasks or information',
        keywords: ['tasks', 'details', 'checklist'],
        category: 'clipboards & lists',
        unicode: '\e9ea'
    },
    {
        name: 'lock-open',
        icon: 'icon-lock-open',
        description: 'Use to represent an unlocked item, access, or permission',
        keywords: ['unlock', 'open', 'access'],
        category: 'ui',
        unicode: '\e9eb'
    },
    {
        name: 'lock',
        icon: 'icon-lock',
        description: 'Use to represent a locked item or to suggest that something is secure',
        keywords: ['secure', 'permissions', 'access'],
        category: 'ui',
        unicode: '\e9ec'
    },
    {
        name: 'logic-and',
        icon: 'icon-logic-and',
        description: 'Use to represent a logical AND operation, conjunction, or intersection',
        keywords: ['boolean', 'expression'],
        category: 'data & analytics',
        unicode: '\e9ed'
    },
    {
        name: 'logic-or',
        icon: 'icon-logic-or',
        description: 'Use to represent a logical OR operation, disjunction, or union',
        keywords: ['boolean', 'expression'],
        category: 'data & analytics',
        unicode: '\e9ee'
    },
    {
        name: 'lungs',
        icon: 'icon-lungs',
        description: 'Use to represent a respiratory system, breathing, or oxygenation',
        keywords: ['healthcare', 'medical', 'respiratory'],
        category: 'medical',
        unicode: '\e9ef'
    },
    {
        name: 'map-marker-plus',
        icon: 'icon-map-marker-plus',
        description: 'In a measures context, this icon represents an encounter',
        keywords: ['location', 'pin', 'encounter'],
        category: 'medical',
        unicode: '\e9f0'
    },
    {
        name: 'map-marker',
        icon: 'icon-map-marker',
        description: 'Use to represent a phyiscal location or address',
        keywords: ['location', 'pin', 'address'],
        category: 'ui',
        unicode: '\e9f1'
    },
    {
        name: 'medical-briefcase',
        icon: 'icon-medical-briefcase',
        description: 'Use to represent a medical kit or medical supplies',
        keywords: ['healthcare', 'medical', 'procedure'],
        category: 'medical',
        unicode: '\e9f2'
    },
    {
        name: 'medicine',
        icon: 'icon-medicine',
        description: 'Use to represent a medical organization, healthcare provider, or healthcare generally',
        keywords: ['organization', 'healthcare', 'staff'],
        category: 'medical',
        unicode: '\e9f4'
    },
    {
        name: 'metric',
        icon: 'icon-metric',
        description: 'Use to represent a metric, measurement, or data point',
        keywords: ['chart', 'data', 'measure'],
        category: 'data & analytics',
        unicode: '\e9f5'
    },
    {
        name: 'money-bill',
        icon: 'icon-money-bill',
        description: 'Use to represent currency, money, or financial matters',
        keywords: ['dollar', 'currency', 'finance'],
        category: 'other symbols',
        unicode: '\e9f6'
    },
    {
        name: 'waveform-cog',
        icon: 'icon-waveform-cog',
        description: 'Use to represent a configuration of monitoring',
        keywords: ['monitor', 'settings', 'tracking'],
        category: 'data & analytics',
        unicode: '\ea64'
    },
    {
        name: 'waveform',
        icon: 'icon-waveform',
        description: 'Use to represent monitoring',
        keywords: ['screen', 'monitor', 'tracking'],
        category: 'data & analytics',
        unicode: '\ea65'
    },
    {
        name: 'moon',
        icon: 'icon-moon',
        description: 'Use to represent a moon, night, or dark sky',
        keywords: ['night', 'dark', 'space'],
        category: 'nature',
        unicode: '\e9f7'
    },
    {
        name: 'number',
        icon: 'icon-number',
        description: 'Use to represent a number, digit, or count',
        keywords: ['numeric', 'digit', 'count'],
        category: 'data & analytics',
        unicode: '\e9f8'
    },
    {
        name: 'paint-brush',
        icon: 'icon-paint-brush',
        description: 'Use to represent art or design',
        keywords: ['art', 'design', 'color'],
        category: 'tools',
        unicode: '\e9fb'
    },
    {
        name: 'palette',
        icon: 'icon-palette',
        description: 'Use to represent art, design, or color selection',
        keywords: ['art', 'design', 'color'],
        category: 'tools',
        unicode: '\e9fc'
    },
    {
        name: 'paper-plane',
        icon: 'icon-paper-plane',
        description: 'Use to represent sending a message, email, or notification',
        keywords: ['send', 'message', 'communication'],
        category: 'other symbols',
        unicode: '\e9fd'
    },
    {
        name: 'paperclip',
        icon: 'icon-paperclip',
        description: 'Use to represent an attachment, link, or connection',
        keywords: ['attachment', 'link', 'connect'],
        category: 'ui',
        unicode: '\e9fe'
    },
    {
        name: 'patient',
        icon: 'icon-patient',
        description: 'Use to represent a patient, user, or care recipient',
        keywords: ['user', 'care', 'health'],
        category: 'medical',
        unicode: '\e9ff'
    },
    {
        name: 'patients',
        icon: 'icon-patients',
        description: 'Use to represent multiple patients, users, or care recipients',
        keywords: ['users', 'care', 'health'],
        category: 'medical',
        unicode: '\ea00'
    },
    {
        name: 'pause',
        icon: 'icon-pause',
        description: 'Use to represent a pause, stop, or break',
        keywords: ['wait', 'video', 'audio'],
        category: 'ui',
        unicode: '\ea01'
    },
    {
        name: 'paw',
        icon: 'icon-paw',
        description: 'Use to represent an animal, pet, or pet care',
        keywords: ['animal', 'pet'],
        category: 'nature',
        unicode: '\ea02'
    },
    {
        name: 'pencil',
        icon: 'icon-pencil',
        description: 'Use to represent editing',
        keywords: ['edit', 'write', 'draw'],
        category: 'tools',
        unicode: '\ea03'
    },
    {
        name: 'percent',
        icon: 'icon-percent',
        description: 'Use to represent a percentage',
        keywords: ['percentage', 'ratio', 'fraction'],
        category: 'data & analytics',
        unicode: '\ea04'
    },
    {
        name: 'person',
        icon: 'icon-person',
        description: 'Use to represent a person, user, or care recipient',
        keywords: ['person', 'avatar', 'user'],
        category: 'users',
        unicode: '\ea06'
    },
    {
        name: 'person-dress',
        icon: 'icon-person-dress',
        description: 'Use to represent a person, user, or care recipient',
        keywords: ['person', 'avatar', 'user'],
        category: 'users',
        unicode: '\ea05'
    },
    {
        name: 'phone',
        icon: 'icon-phone',
        description: 'Use to indicate a phone number',
        keywords: ['call', 'communication', 'contact'],
        category: 'other symbols',
        unicode: '\ea07'
    },
    {
        name: 'pill',
        icon: 'icon-pill',
        description: 'Use to represent a medication or drug',
        keywords: ['healthcare', 'drugs', 'medicine'],
        category: 'medical',
        unicode: '\ea08'
    },
    {
        name: 'plane',
        icon: 'icon-plane',
        description: 'Use to represent travel',
        keywords: ['travel', 'airplane', 'flight'],
        category: 'other symbols',
        unicode: '\ea09'
    },
    {
        name: 'plant',
        icon: 'icon-plant',
        description: 'Use to represent outdoor, nature, or plant life',
        keywords: ['nature', 'environment', 'growth'],
        category: 'nature',
        unicode: '\ea0a'
    },
    {
        name: 'play',
        icon: 'icon-play',
        description: 'Use to represent starting an operation or process',
        keywords: ['start', 'run', 'go'],
        category: 'ui',
        unicode: '\ea0b'
    },
    {
        name: 'plug-circle-bolt',
        icon: 'icon-plug-circle-bolt',
        description: 'Use to represent a power source or connection',
        keywords: ['power', 'energy', 'connected'],
        category: 'data & analytics',
        unicode: '\ea0c'
    },
    {
        name: 'plug-circle-check',
        icon: 'icon-plug-circle-check',
        description: 'Use to represent an active power source or connection',
        keywords: ['power', 'energy', 'connected'],
        category: 'data & analytics',
        unicode: '\ea0d'
    },
    {
        name: 'plug',
        icon: 'icon-plug',
        description: 'Use to represent a power source or connection',
        keywords: ['power', 'energy', 'connected'],
        category: 'data & analytics',
        unicode: '\ea0e'
    },
    {
        name: 'power-off',
        icon: 'icon-power-off',
        description: 'Use to represent deactivating or shutting down a system or operation',
        keywords: ['stop', 'start', 'shutdown'],
        category: 'ui',
        unicode: '\ea0f'
    },
    {
        name: 'prescription-bottle',
        icon: 'icon-prescription-bottle',
        description: 'Use to represent a prescription, medicine, or drug',
        keywords: ['medicine', 'healthcare', 'drugs'],
        category: 'medical',
        unicode: '\ea10'
    },
    {
        name: 'print',
        icon: 'icon-print',
        description: 'Use to represent the action of printing a document',
        keywords: ['document', 'output'],
        category: 'ui',
        unicode: '\ea11'
    },
    {
        name: 'medical-hammer',
        icon: 'icon-medical-hammer',
        description: 'Use to represent a medical procedure, test, or treatment',
        keywords: ['procedure', 'healthcare', 'test'],
        category: 'medical',
        unicode: '\e9f3'
    },
    {
        name: 'nurse',
        icon: 'icon-nurse',
        description: 'Use to represent a nurse, medical assistant, or healthcare provider',
        keywords: ['doctor', 'PA', 'user'],
        category: 'medical',
        unicode: '\e9f9'
    },
    {
        name: 'nurses',
        icon: 'icon-nurses',
        description: 'Use to represent multiple nurses, medical assistants, or healthcare providers',
        keywords: ['doctor', 'PA', 'user'],
        category: 'medical',
        unicode: '\e9fa'
    },
    {
        name: 'queue',
        icon: 'icon-queue',
        description: 'Use to represent a queue or sequence',
        keywords: ['list', 'order', 'sequence'],
        category: 'clipboards & lists',
        unicode: '\ea12'
    },
    {
        name: 'radiation',
        icon: 'icon-radiation',
        description: 'Use to represent radiation, radioactive material, or exposure',
        keywords: ['radioactive', 'danger', 'chemo'],
        category: 'medical',
        unicode: '\ea13'
    },
    {
        name: 'recycle',
        icon: 'icon-recycle',
        description: 'Use to represent recovering deleted items, or environmental responsibility',
        keywords: ['environment', 'sustainability', 'recover'],
        category: 'arrows',
        unicode: '\ea14'
    },
    {
        name: 'redo',
        icon: 'icon-redo',
        description: 'Use to represent redoing an action or operation',
        keywords: ['repeat', 'action'],
        category: 'arrows',
        unicode: '\ea15'
    },
    {
        name: 'refresh',
        icon: 'icon-refresh',
        description: 'Use to represent reloading or updating a page, data, or system',
        keywords: ['reload', 'update', 'sync'],
        category: 'arrows',
        unicode: '\ea16'
    },
    {
        name: 'report',
        icon: 'icon-report',
        description: 'This icon represents an analytics report in the Ignite ecosystem',
        keywords: ['analytics', 'data', 'charts'],
        category: 'data & analytics',
        unicode: '\ea17'
    },
    {
        name: 'ribbon',
        icon: 'icon-ribbon',
        description: 'Use to represent cancer support',
        keywords: ['cancer', 'support'],
        category: 'medical',
        unicode: '\ea18'
    },
    {
        name: 'right-panel-hide',
        icon: 'icon-right-panel-hide',
        description: 'Use to represent hiding a panel or section',
        keywords: ['vitalware', 'ui', 'toggle'],
        category: 'vitalware',
        unicode: '\ea19'
    },
    {
        name: 'right-panel-hide-alt',
        icon: 'icon-right-panel-hide-alt',
        description: 'Use to represent hiding a panel or section',
        keywords: ['vitalware', 'ui', 'toggle'],
        category: 'vitalware',
        unicode: '\ea1a'
    },
    {
        name: 'right-panel-show',
        icon: 'icon-right-panel-show',
        description: 'Use to represent showing a panel or section',
        keywords: ['vitalware', 'ui', 'toggle'],
        category: 'vitalware',
        unicode: '\ea1b'
    },
    {
        name: 'right-panel-show-alt',
        icon: 'icon-right-panel-show-alt',
        description: 'Use to represent showing a panel or section',
        keywords: ['vitalware', 'ui', 'toggle'],
        category: 'vitalware',
        unicode: '\ea1c'
    },
    {
        name: 'umbrella',
        icon: 'icon-umbrella',
        description: 'Use to represent weather or protection from risk',
        keywords: ['weather', 'risk', 'protection'],
        category: 'nature',
        unicode: '\ea52'
    },
    {
        name: 'rocket',
        icon: 'icon-rocket',
        description: 'Use to represent launching an action or process or exploring something',
        keywords: ['launch', 'travel', 'explore'],
        category: 'other symbols',
        unicode: '\ea1d'
    },
    {
        name: 'run',
        icon: 'icon-run',
        description: 'This icon represents the action of running a process or task',
        keywords: ['play', 'go', 'execute'],
        category: 'ui',
        unicode: '\ea1e'
    },
    {
        name: 'save',
        icon: 'icon-save',
        description: 'Use to represent the action of saving a file, data, or document',
        keywords: ['floppy', 'disk', 'store'],
        category: 'ui',
        unicode: '\ea1f'
    },
    {
        name: 'scale-balanced',
        icon: 'icon-scale-balanced',
        description: 'Use to represent a balanced comparison or equality/fairness',
        keywords: ['justice', 'compare', 'equal'],
        category: 'other symbols',
        unicode: '\ea20'
    },
    {
        name: 'scale-unbalanced',
        icon: 'icon-scale-unbalanced',
        description: 'Use to represent an unbalanced comparison or inequality',
        keywords: ['justice', 'compare'],
        category: 'other symbols',
        unicode: '\ea21'
    },
    {
        name: 'scissors',
        icon: 'icon-scissors',
        description: 'Use to represent cutting or removing something',
        keywords: ['tool', 'cut', 'remove'],
        category: 'tools',
        unicode: '\ea22'
    },
    {
        name: 'screwdriver',
        icon: 'icon-screwdriver',
        description: 'Use to represent repair, maintenance, or editing settings',
        keywords: ['tool', 'repair', 'maintenance'],
        category: 'tools',
        unicode: '\ea24'
    },
    {
        name: 'screwdriver-wrench',
        icon: 'icon-screwdriver-wrench',
        description: 'Use to represent repair, maintenance, or editing settings',
        keywords: ['tool', 'repair', 'maintenance'],
        category: 'tools',
        unicode: '\ea24'
    },
    {
        name: 'search',
        icon: 'icon-search',
        description: 'Use to represent searching for something',
        keywords: ['magnifying glass', 'find'],
        category: 'ui',
        unicode: '\ea25'
    },
    {
        name: 'share',
        icon: 'icon-share',
        description: 'Use to represent sharing something',
        keywords: ['send', 'arrow'],
        category: 'arrows',
        unicode: '\ea26'
    },
    {
        name: 'shared',
        icon: 'icon-shared',
        description: 'Use to represent a shared item, collaboration, or team',
        keywords: ['users', 'collaborate', 'team'],
        category: 'users',
        unicode: '\ea27'
    },
    {
        name: 'shield-check',
        icon: 'icon-shield-check',
        description: 'Use to represent a secure, verified, or trusted item',
        keywords: ['secure', 'permissions', 'access'],
        category: 'ui',
        unicode: '\ea28'
    },
    {
        name: 'shuffle',
        icon: 'icon-shuffle',
        description: 'Use to represent shuffling or mixing something',
        keywords: ['switch', 'mix', 'random'],
        category: 'arrows',
        unicode: '\ea29'
    },
    {
        name: 'sign-out',
        icon: 'icon-sign-out',
        description: 'Use to represent logging out or exiting a session',
        keywords: ['logout', 'exit', 'leave'],
        category: 'arrows',
        unicode: '\ea2a'
    },
    {
        name: 'sort-ascend',
        icon: 'icon-sort-ascend',
        description: 'Use to represent sorting in ascending order',
        keywords: ['order', 'ascending'],
        category: 'arrows',
        unicode: '\ea2b'
    },
    {
        name: 'sort-descend',
        icon: 'icon-sort-descend',
        description: 'Use to represent sorting in descending order',
        keywords: ['order', 'descending'],
        category: 'arrows',
        unicode: '\ea2c'
    },
    {
        name: 'sort',
        icon: 'icon-sort',
        description: 'Use to represent sorting or ordering',
        keywords: ['sortable', 'order'],
        category: 'arrows',
        unicode: '\ea2d'
    },
    {
        name: 'southpanel-hide',
        icon: 'icon-southpanel-hide',
        description: 'Use to represent hiding a panel or section',
        keywords: ['vitalware', 'ui', 'toggle'],
        category: 'vitalware',
        unicode: '\ea2e'
    },
    {
        name: 'southpanel-hide-alt',
        icon: 'icon-southpanel-hide-alt',
        description: 'Use to represent hiding a panel or section',
        keywords: ['vitalware', 'ui', 'toggle'],
        category: 'vitalware',
        unicode: '\ea2f'
    },
    {
        name: 'southpanel-show-alt',
        icon: 'icon-southpanel-show-alt',
        description: 'Use to represent showing a panel or section',
        keywords: ['vitalware', 'ui', 'toggle'],
        category: 'vitalware',
        unicode: '\ea30'
    },
    {
        name: 'southpanel-show-alt-copy',
        icon: 'icon-southpanel-show-alt-copy',
        description: 'Use to represent showing a panel or section',
        keywords: ['vitalware', 'ui', 'toggle'],
        category: 'vitalware',
        unicode: '\ea31'
    },
    {
        name: 'square-check',
        icon: 'icon-square-check',
        description: 'Use to represent approval, confirmation, or acceptance',
        keywords: ['approval', 'confirm', 'checkmark'],
        category: 'status',
        unicode: '\ea32'
    },
    {
        name: 'square-minus',
        icon: 'icon-square-minus',
        description: 'Use to represent minimizing or collapsing something, or the status of being removed',
        keywords: ['minimize', 'collapse', 'remove'],
        category: 'status',
        unicode: '\ea33'
    },
    {
        name: 'square-plus',
        icon: 'icon-square-plus',
        description: 'Use to represent adding or expanding something, or the status of being added',
        keywords: ['add', 'increase', 'expand'],
        category: 'status',
        unicode: '\ea34'
    },
    {
        name: 'star-o',
        icon: 'icon-star-o',
        description: 'Use for the action of favoriting an item',
        keywords: ['favorite', 'rating'],
        category: 'ui',
        unicode: '\ea35'
    },
    {
        name: 'star',
        icon: 'icon-star',
        description: 'Use to represent a favorite or starred item',
        keywords: ['favorited', 'rating'],
        category: 'ui',
        unicode: '\ea36'
    },
    {
        name: 'stethoscope',
        icon: 'icon-stethoscope',
        description: 'Use to represent a stethoscope, medical instrument, or medical procedure',
        keywords: ['healthcare', 'medical', 'doctor'],
        category: 'medical',
        unicode: '\ea37'
    },
    {
        name: 'stopwatch',
        icon: 'icon-stopwatch',
        description: 'Use to represent a timer, or duration',
        keywords: ['duration', 'time', 'clock'],
        category: 'date & time',
        unicode: '\ea38'
    },
    {
        name: 'sum',
        icon: 'icon-sum',
        description: 'Use to represent a math function or the total of a collection',
        keywords: ['function', 'math', 'addition'],
        category: 'data & analytics',
        unicode: '\ea39'
    },
    {
        name: 'sun',
        icon: 'icon-sun',
        description: 'Use to represent a sun, day, or light',
        keywords: ['weather', 'day', 'light'],
        category: 'nature',
        unicode: '\ea3a'
    },
    {
        name: 'syringe',
        icon: 'icon-syringe',
        description: 'Use to represent a medical instrument or medication administration',
        keywords: ['healthcare', 'vaccine', 'injection'],
        category: 'medical',
        unicode: '\ea3b'
    },
    {
        name: 'table-add',
        icon: 'icon-table-add',
        description: 'Use to represent adding a new table',
        keywords: ['datagrid', 'insert', 'add'],
        category: 'data & analytics',
        unicode: '\ea3c'
    },
    {
        name: 'table-cog',
        icon: 'icon-table-cog',
        description: 'Use to represent configuring a table or its columns',
        keywords: ['datagrid', 'settings', 'configure'],
        category: 'data & analytics',
        unicode: '\ea3d'
    },
    {
        name: 'table-edit',
        icon: 'icon-table-edit',
        description: 'Use to represent editing a table',
        keywords: ['datagrid', 'settings', 'modify'],
        category: 'data & analytics',
        unicode: '\ea3e'
    },
    {
        name: 'table-rows',
        icon: 'icon-table-rows',
        description: 'Use to represent rows or entries in a data grid',
        keywords: ['datagrid', 'entries', 'data'],
        category: 'data & analytics',
        unicode: '\ea3f'
    },
    {
        name: 'table',
        icon: 'icon-table',
        description: 'Use to represent a table, data grid, or data entity',
        keywords: ['datagrid', 'data'],
        category: 'data & analytics',
        unicode: '\ea40'
    },
    {
        name: 'tables-add',
        icon: 'icon-tables-add',
        description: 'Use to represent adding multiple tables or configurations',
        keywords: ['datagrid', 'insert', 'add'],
        category: 'data & analytics',
        unicode: '\ea41'
    },
    {
        name: 'tables-edit',
        icon: 'icon-tables-edit',
        description: 'Use to represent editing multiple tables or entities in bulk',
        keywords: ['datagrid', 'settings', 'modify'],
        category: 'data & analytics',
        unicode: '\ea42'
    },
    {
        name: 'tables',
        icon: 'icon-tables',
        description: 'Use to represent multiple tables or data grids',
        keywords: ['datagrids', 'data', 'entities'],
        category: 'data & analytics',
        unicode: '\ea43'
    },
    {
        name: 'tag',
        icon: 'icon-tag',
        description: 'Use to represent a tag, label, or category',
        keywords: ['property', 'label', 'category'],
        category: 'ui',
        unicode: '\ea44'
    },
    {
        name: 'tags',
        icon: 'icon-tags',
        description: 'Use to represent multiple tags, labels, or categories',
        keywords: ['property', 'label', 'category'],
        category: 'ui',
        unicode: '\ea45'
    },
    {
        name: 'thumbs-down',
        icon: 'icon-thumbs-down',
        description: 'Use to represent a negative rating or dislike',
        keywords: ['dislike', 'negative', 'rating'],
        category: 'ui',
        unicode: '\ea46'
    },
    {
        name: 'thumbs-up',
        icon: 'icon-thumbs-up',
        description: 'Use to represent a positive rating or like',
        keywords: ['like', 'positive', 'rating'],
        category: 'ui',
        unicode: '\ea47'
    },
    {
        name: 'thumbtack',
        icon: 'icon-thumbtack',
        description: 'Use to represent a pin, attachment, or something tokeep',
        keywords: ['pin', 'attach', 'keep'],
        category: 'ui',
        unicode: '\ea48'
    },
    {
        name: 'toggle-off',
        icon: 'icon-toggle-off',
        description: 'Use to represent an inactive state, or the action of turning something off',
        keywords: ['switch', 'off', 'inactive'],
        category: 'ui',
        unicode: '\ea49'
    },
    {
        name: 'toggle-on',
        icon: 'icon-toggle-on',
        description: 'Use to represent an active state, or the action of turning something on',
        keywords: ['switch', 'on', 'active'],
        category: 'ui',
        unicode: '\ea4a'
    },
    {
        name: 'toolbox-add',
        icon: 'icon-toolbox-add',
        description: 'Use to represent adding a new job',
        keywords: ['job', 'create', 'add'],
        category: 'tools',
        unicode: '\ea4b'
    },
    {
        name: 'toolbox-solid',
        icon: 'icon-toolbox-solid',
        description: 'Use to represent a job or workflow in Ignite',
        keywords: ['job', 'process'],
        category: 'tools',
        unicode: '\ea4c'
    },
    {
        name: 'toolbox',
        icon: 'icon-toolbox',
        description: 'Use to represent a job or workflow in Ignite',
        keywords: ['job', 'process'],
        category: 'tools',
        unicode: '\ea4d'
    },
    {
        name: 'trash',
        icon: 'icon-trash',
        description: 'Use to represent the action of deleting an item',
        keywords: ['delete', 'remove', 'bin'],
        category: 'ui',
        unicode: '\ea4e'
    },
    {
        name: 'triflame',
        icon: 'icon-triflame',
        description: 'Use this Health Catalyst logo to represent the company',
        keywords: ['logo', 'brand', 'company'],
        category: 'ui',
        unicode: '\ea50'
    },
    {
        name: 'tree',
        icon: 'icon-tree',
        description: 'Use to represent a tree, plant, or natural element',
        keywords: ['tree', 'plant', 'natural'],
        category: 'nature',
        unicode: '\ea4f'
    },
    {
        name: 'trophy',
        icon: 'icon-trophy',
        description: 'Use to represent an award, achievement, or highly ranked item',
        keywords: ['award', 'achievement', 'success'],
        category: 'other symbols',
        unicode: '\ea51'
    },
    {
        name: 'undo',
        icon: 'icon-undo',
        description: 'Use to represent undoing an action or operation',
        keywords: ['reverse', 'action'],
        category: 'arrows',
        unicode: '\ea53'
    },
    {
        name: 'universal-access',
        icon: 'icon-universal-access',
        description: 'Use to represent accessibility or inclusion',
        keywords: ['accessibility', 'inclusion', 'equal'],
        category: 'users',
        unicode: '\ea54'
    },
    {
        name: 'upload',
        icon: 'icon-upload',
        description: 'Use to represent uploading a file, data, or document',
        keywords: ['import', 'data', 'transfer'],
        category: 'arrows',
        unicode: '\ea55'
    },
    {
        name: 'user-add',
        icon: 'icon-user-add',
        description: 'Use to represent the action of adding a new user or sharing content',
        keywords: ['person', 'new', 'create'],
        category: 'users',
        unicode: '\ea56'
    },
    {
        name: 'user-minus',
        icon: 'icon-user-minus',
        description: 'Use to represent the action of removing a user from a list',
        keywords: ['person', 'remove', 'unshare'],
        category: 'users',
        unicode: '\ea5a'
    },
    {
        name: 'user-check',
        icon: 'icon-user-check',
        description: 'Use to represent a user who has been approved or verified',
        keywords: ['person', 'remove', 'unshare'],
        category: 'users',
        unicode: '\ea57'
    },
    {
        name: 'user-circle',
        icon: 'icon-user-circle',
        description: 'Use to represent a user profile or account',
        keywords: ['person', 'profile', 'account'],
        category: 'users',
        unicode: '\ea58'
    },
    {
        name: 'user-cog',
        icon: 'icon-user-cog',
        description: 'Use to represent user settings or configuration',
        keywords: ['person', 'settings', 'profile'],
        category: 'users',
        unicode: '\ea59'
    },
    {
        name: 'user',
        icon: 'icon-user',
        description: 'Use to represent a user profile or account',
        keywords: ['person', 'profile', 'account'],
        category: 'users',
        unicode: '\ea5b'
    },
    {
        name: 'users',
        icon: 'icon-users',
        description: 'Use to represent a group of users or people',
        keywords: ['group', 'people', 'team'],
        category: 'users',
        unicode: '\ea5c'
    },
    {
        name: 'vial',
        icon: 'icon-vial',
        description: 'Use to represent a sample or medical lab',
        keywords: ['test', 'sample', 'lab'],
        category: 'medical',
        unicode: '\ea5d'
    },
    {
        name: 'vials',
        icon: 'icon-vials',
        description: 'Use to represent a sample or medical lab',
        keywords: ['test', 'sample', 'lab'],
        category: 'medical',
        unicode: '\ea5e'
    },
    {
        name: 'virus',
        icon: 'icon-virus',
        description: 'Use to represent a virus, bacteria, or infection',
        keywords: ['bacteria', 'germs', 'infection'],
        category: 'medical',
        unicode: '\ea5f'
    },
    {
        name: 'viruses',
        icon: 'icon-viruses',
        description: 'Use to represent a virus, bacteria, or infection',
        keywords: ['bacteria', 'germs', 'infection'],
        category: 'medical',
        unicode: '\ea60'
    },
    {
        name: 'vitals',
        icon: 'icon-vitals',
        description: 'Use to represent a vital sign or health metric',
        keywords: ['heart', 'healthcare', 'monitor'],
        category: 'medical',
        unicode: '\ea61'
    },
    {
        name: 'walking',
        icon: 'icon-walking',
        description: 'Use to represent walking, exercise, or movement',
        keywords: ['exxercise', 'activity', 'movement'],
        category: 'users',
        unicode: '\ea62'
    },
    {
        name: 'warn',
        icon: 'icon-warn',
        description: 'Use to represent a warning or alert',
        keywords: ['caution', 'alert', 'warning'],
        category: 'status',
        unicode: '\ea63'
    },
    {
        name: 'workspace',
        icon: 'icon-workspace',
        description: 'Use to represent a workspace, desk, or office',
        keywords: ['desk', 'office', 'computer'],
        category: 'data & analytics',
        unicode: '\ea66'
    },
    {
        name: 'wrench',
        icon: 'icon-wrench',
        description: 'Use to represent a tool or setting',
        keywords: ['manage', 'tool', 'settings'],
        category: 'tools',
        unicode: '\ea67'
    },
    {
        name: 'x-ray',
        icon: 'icon-x-ray',
        description: 'Use to represent an x-ray, medical imaging, or diagnostic tool',
        keywords: ['healthcare', 'medical', 'imaging'],
        category: 'medical',
        unicode: '\ea68'
    },
];
