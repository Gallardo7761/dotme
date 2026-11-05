import {
  faBook, faCodeBranch, faGlobe, faHeartPulse, faNetworkWired, faPaste, faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';

const ICONS = {
  'book': faBook,
  'code-branch': faCodeBranch,
  'heart-pulse': faHeartPulse,
  'network-wired': faNetworkWired,
  'paste': faPaste,
  'shield-halved': faShieldHalved,
};

export const iconFor = (name) => ICONS[name] ?? faGlobe;
