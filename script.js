'use strict';

const projects = {
  b2: {
    id: 'b2',
    number: '01',
    title: 'B-2 Spirit Composite Model',
    eyebrow: 'ME 318 Lab Upgrade · Composite Manufacturing',
    url: 'https://jftomas747.github.io/b2-spirit-mass-properties/',
    description: 'A larger carbon-fiber aircraft model created for mass-properties demonstrations using a 3D-printed core, wet layup, vacuum bagging, finishing, repair, and repeatable spare production.',
    challenge: 'Replace a much smaller lab model with an aircraft-shaped object that is easier to see, handle, and use during demonstrations of center of gravity, natural frequency, and mass moment of inertia.',
    approach: 'Join a segmented PLA core, prepare the surface, apply carbon fiber by wet layup, consolidate the laminate under vacuum, then trim, sand, seal, and document repair methods.',
    outcome: 'The work produced a 3.5-foot model near 1:50 scale, a more refined laboratory artifact, and a repeatable process for additional models and future repairs.',
    metrics: [
      ['Model span', '3.5 ft'],
      ['Approx. scale', '~1:50'],
      ['Core + shell', 'PLA + carbon fiber']
    ],
    tags: ['Carbon fiber', 'Wet layup', 'Vacuum bagging', '3D printing', 'Surface finishing', 'Composite repair'],
    keywords: 'b2 aircraft mass properties composite carbon fiber vacuum bagging layup manufacturing 3d printing repair me318'
  },
  romi: {
    id: 'romi',
    number: '02',
    title: 'Autonomous Romi Robot',
    eyebrow: 'ME 405 Final Project · Embedded Controls',
    url: 'https://jftomas747.github.io/me405-final-website/',
    description: 'A differential-drive robot that integrates cooperative MicroPython tasks, closed-loop motor control, multiple sensors, state estimation, and finite-state navigation for an obstacle course.',
    challenge: 'Combine the quarter’s sensing, controls, estimation, and embedded-software work into one robot that could move through a printed obstacle course under real testing conditions.',
    approach: 'Use modular drivers and generator-based tasks for motors, encoders, line sensing, IMU data, bump events, estimation, user control, and high-level navigation under a cooperative scheduler.',
    outcome: 'The integrated robot completed the required course tasks with an official runtime of exactly 2:00 and demonstrated end-to-end hardware, software, controls, and navigation integration.',
    metrics: [
      ['Official runtime', '2:00'],
      ['Drive system', 'Differential'],
      ['Firmware', 'MicroPython']
    ],
    tags: ['MicroPython', 'Closed-loop control', 'Encoders', 'IMU', 'Line sensing', 'State estimation', 'Finite-state machines'],
    keywords: 'romi robot autonomous embedded controls micropython stm32 nucleo line sensor imu encoders bump sensors state estimation fsm me405'
  },
  qarm: {
    id: 'qarm',
    number: '03',
    title: 'QArm Tic-Tac-Toe Robot',
    eyebrow: 'ME 423 Final Project · Vision + Robotics',
    url: 'https://jftomas747.github.io/me423_robotics_tictactoe_project/',
    description: 'An interactive robotic arm that observes a human move, interprets the board with RGB vision, chooses a response with minimax, and executes a precise pick-and-place move.',
    challenge: 'Expand an initial color-sorting concept into a more complete mechatronics demonstration that required perception, strategy, motion planning, and accurate manipulation.',
    approach: 'Use a Quanser QArm, RGB camera input, OpenCV color masking and centroid extraction, calibrated board coordinates, inverse kinematics, and a minimax game algorithm.',
    outcome: 'The final system plays blue-versus-gold tic-tac-toe against a human and combines computer vision, game-state reasoning, and repeatable robotic manipulation in one demonstration.',
    metrics: [
      ['Manipulator', '4 DOF'],
      ['Perception', 'RGB + OpenCV'],
      ['Decision logic', 'Minimax']
    ],
    tags: ['Robotics', 'OpenCV', 'Computer vision', 'Inverse kinematics', 'Minimax', 'Pick and place'],
    keywords: 'qarm tic tac toe robotics robot arm opencv computer vision inverse kinematics minimax pick place me423'
  },
  carrier: {
    id: 'carrier',
    number: '04',
    title: 'Composite Carrier',
    eyebrow: 'Mechanical Engineering Senior Project · Mechanical Design',
    url: 'https://jftomas747.github.io/composite-carrier/',
    description: 'A safer retrieval concept for elevated composite rolls using passive rack-mounted latches, a ground-level pulley release, and a custom attachment for an existing Genie dolly.',
    challenge: 'Reduce ladder-based access to heavy composite material rolls stored roughly ten feet above the floor while preserving the laboratory’s existing rack capacity and material-handling equipment.',
    approach: 'Develop and fabricate three coordinated subsystems: spring-return rotary latches, a paired ground-level release, and a welded foldable cradle that interfaces with the Genie dolly.',
    outcome: 'The verification prototype demonstrated the core retrieval concept, passed most planned checks, and revealed a specific clearance issue to address in the next geometry refinement.',
    metrics: [
      ['Storage height', '~10 ft'],
      ['Architecture', '3 subsystems'],
      ['Actuation', 'Passive mechanical']
    ],
    tags: ['Mechanism design', 'CAD', 'Waterjet', 'Welding', 'Prototyping', 'Verification'],
    keywords: 'composite carrier mechanical design senior project rotary latch pulley genie dolly welding cad prototype verification safety materials handling'
  }
};

const root = document.documentElement;
const body = document.body;
const header = document.getElementById('site-header');
const progressBar = document.getElementById('scroll-progress-bar');
const backToTop = document.getElementById('back-to-top');
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const projectDialog = document.getElementById('project-dialog');
const commandDialog = document.getElementById('command-dialog');
const commandSearch = document.getElementById('command-search');
const commandResults = document.getElementById('command-results');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projectCards = [...document.querySelectorAll('[data-project-card]')];
const commandTriggers = [...document.querySelectorAll('.command-trigger')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');

let selectedCommandIndex = 0;
let currentCommandResults = Object.values(projects);
const filterTimers = new WeakMap();

function setTheme(theme, persist = true) {
  const normalized = theme === 'light' ? 'light' : 'dark';
  root.dataset.theme = normalized;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', normalized === 'light' ? '#f4f5f1' : '#070b12');
  themeToggle?.setAttribute('aria-label', normalized === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  themeToggle?.setAttribute('title', normalized === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  if (persist) {
    try { localStorage.setItem('portfolio-theme', normalized); } catch (_) {}
  }
}

setTheme(root.dataset.theme || 'dark', false);

themeToggle?.addEventListener('click', () => {
  setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
});

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
  let saved = null;
  try { saved = localStorage.getItem('portfolio-theme'); } catch (_) {}
  if (!saved) setTheme(event.matches ? 'light' : 'dark', false);
});

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, scrollTop / scrollable);
  progressBar.style.transform = `scaleX(${progress})`;
  header?.classList.toggle('is-scrolled', scrollTop > 12);
  backToTop?.classList.toggle('is-visible', scrollTop > 650);
}

let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    updateScrollUI();
    scrollTicking = false;
  });
}, { passive: true });

updateScrollUI();

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
});

function setMobileMenu(open) {
  if (!mobileNav || !menuToggle) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  header?.classList.toggle('menu-open', open);
  mobileNav.hidden = !open;
}

menuToggle?.addEventListener('click', () => {
  setMobileMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

mobileNav?.querySelectorAll('a, button').forEach((item) => {
  item.addEventListener('click', () => setMobileMenu(false));
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) setMobileMenu(false);
});

// Reveal content only after the observer is ready, preserving a no-JS fallback.
body.classList.add('reveal-ready');
const revealItems = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Active section state in the desktop navigation.
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const observedSections = ['projects', 'capabilities', 'about']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
  }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-25% 0px -55%' });
  observedSections.forEach((section) => navObserver.observe(section));
}

function openProjectDialog(id) {
  const project = projects[id];
  if (!project || !projectDialog) return;

  document.getElementById('dialog-eyebrow').textContent = project.eyebrow;
  document.getElementById('dialog-title').textContent = project.title;
  document.getElementById('dialog-description').textContent = project.description;
  document.getElementById('dialog-challenge').textContent = project.challenge;
  document.getElementById('dialog-approach').textContent = project.approach;
  document.getElementById('dialog-outcome').textContent = project.outcome;

  const metrics = document.getElementById('dialog-metrics');
  metrics.replaceChildren(...project.metrics.map(([label, value]) => {
    const item = document.createElement('div');
    item.className = 'dialog-metric';
    const labelNode = document.createElement('span');
    const valueNode = document.createElement('strong');
    labelNode.textContent = label;
    valueNode.textContent = value;
    item.append(labelNode, valueNode);
    return item;
  }));

  const tags = document.getElementById('dialog-tags');
  tags.replaceChildren(...project.tags.map((tag) => {
    const item = document.createElement('li');
    item.textContent = tag;
    return item;
  }));

  const launch = document.getElementById('dialog-launch');
  launch.href = project.url;
  launch.setAttribute('aria-label', `Open the full ${project.title} project site in a new tab`);

  projectDialog.showModal();
  body.classList.add('dialog-open');
}

document.querySelectorAll('[data-project-open]').forEach((button) => {
  button.addEventListener('click', () => openProjectDialog(button.dataset.projectOpen));
});

function syncDialogBodyState() {
  if (!projectDialog?.open && !commandDialog?.open) body.classList.remove('dialog-open');
}

projectDialog?.addEventListener('close', syncDialogBodyState);
projectDialog?.addEventListener('click', (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

function renderCommandResults(query = '') {
  const normalized = query.trim().toLowerCase();
  currentCommandResults = Object.values(projects).filter((project) => {
    const haystack = `${project.title} ${project.eyebrow} ${project.description} ${project.tags.join(' ')} ${project.keywords}`.toLowerCase();
    return !normalized || haystack.includes(normalized);
  });

  selectedCommandIndex = Math.min(selectedCommandIndex, Math.max(0, currentCommandResults.length - 1));
  commandResults.replaceChildren();

  if (!currentCommandResults.length) {
    const empty = document.createElement('div');
    empty.className = 'command-empty';
    empty.textContent = 'No matching projects. Try “robotics,” “composites,” “vision,” or “design.”';
    commandResults.append(empty);
    return;
  }

  currentCommandResults.forEach((project, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `command-result${index === selectedCommandIndex ? ' is-selected' : ''}`;
    button.setAttribute('role', 'option');
    button.setAttribute('aria-selected', String(index === selectedCommandIndex));
    button.dataset.commandIndex = String(index);

    const number = document.createElement('span');
    number.className = 'command-result__index';
    number.textContent = project.number;

    const copy = document.createElement('span');
    const title = document.createElement('strong');
    const subtitle = document.createElement('small');
    title.textContent = project.title;
    subtitle.textContent = project.eyebrow;
    copy.append(title, subtitle);

    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';

    button.append(number, copy, arrow);
    button.addEventListener('mouseenter', () => updateSelectedCommand(index));
    button.addEventListener('click', () => launchCommandProject(project));
    commandResults.append(button);
  });
}

function updateSelectedCommand(index) {
  if (!currentCommandResults.length) return;
  selectedCommandIndex = (index + currentCommandResults.length) % currentCommandResults.length;
  commandResults.querySelectorAll('.command-result').forEach((button, buttonIndex) => {
    const selected = buttonIndex === selectedCommandIndex;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-selected', String(selected));
    if (selected) button.scrollIntoView({ block: 'nearest' });
  });
}

function launchCommandProject(project) {
  window.open(project.url, '_blank', 'noopener,noreferrer');
  commandDialog.close();
}

function openCommandDialog() {
  if (!commandDialog || commandDialog.open) return;
  selectedCommandIndex = 0;
  commandSearch.value = '';
  renderCommandResults();
  commandDialog.showModal();
  body.classList.add('dialog-open');
  requestAnimationFrame(() => commandSearch.focus());
}

commandTriggers.forEach((trigger) => trigger.addEventListener('click', openCommandDialog));
commandDialog?.addEventListener('close', syncDialogBodyState);
commandDialog?.addEventListener('click', (event) => {
  if (event.target === commandDialog) commandDialog.close();
});

commandSearch?.addEventListener('input', () => {
  selectedCommandIndex = 0;
  renderCommandResults(commandSearch.value);
});

commandSearch?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    updateSelectedCommand(selectedCommandIndex + 1);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    updateSelectedCommand(selectedCommandIndex - 1);
  } else if (event.key === 'Enter' && currentCommandResults.length) {
    event.preventDefault();
    launchCommandProject(currentCommandResults[selectedCommandIndex]);
  }
});

document.addEventListener('keydown', (event) => {
  const target = event.target;
  const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;
  const commandShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
  const slashShortcut = event.key === '/' && !typing && !event.metaKey && !event.ctrlKey && !event.altKey;

  if (commandShortcut || slashShortcut) {
    event.preventDefault();
    openCommandDialog();
  }
});

function applyFilter(filter, options = {}) {
  const normalized = filter || 'all';
  let visibleCount = 0;

  filterButtons.forEach((button) => {
    const active = button.dataset.filter === normalized;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  projectCards.forEach((card) => {
    const categories = card.dataset.category.split(/\s+/);
    const show = normalized === 'all' || categories.includes(normalized);
    const oldTimer = filterTimers.get(card);
    if (oldTimer) clearTimeout(oldTimer);

    if (show) {
      visibleCount += 1;
      card.hidden = false;
      requestAnimationFrame(() => card.classList.remove('is-filtering-out'));
    } else {
      card.classList.add('is-filtering-out');
      const timer = window.setTimeout(() => {
        card.hidden = true;
      }, reduceMotion.matches ? 0 : 170);
      filterTimers.set(card, timer);
    }
  });

  const status = document.getElementById('filter-status');
  if (status) {
    if (normalized === 'all') {
      status.textContent = 'Showing all four projects';
    } else {
      const activeButton = filterButtons.find((button) => button.dataset.filter === normalized);
      const label = activeButton?.childNodes[0]?.textContent?.trim().toLowerCase() || normalized;
      status.textContent = `Showing ${visibleCount} ${label} project${visibleCount === 1 ? '' : 's'}`;
    }
  }

  if (options.scroll) {
    document.getElementById('projects')?.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
  }
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => applyFilter(button.dataset.filter));
});

document.querySelectorAll('[data-filter-jump]').forEach((button) => {
  button.addEventListener('click', () => applyFilter(button.dataset.filterJump, { scroll: true }));
});

// Subtle card tilt on devices with a precise pointer.
if (finePointer.matches && !reduceMotion.matches) {
  projectCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty('--ry', `${(x - 0.5) * 5}deg`);
      card.style.setProperty('--rx', `${(0.5 - y) * 4}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
    });
  });
}

// Use the platform-appropriate shortcut label.
const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
document.querySelectorAll('.command-key, .button-key').forEach((node) => {
  node.textContent = isMac ? '⌘K' : 'Ctrl K';
});

document.getElementById('current-year').textContent = String(new Date().getFullYear());
