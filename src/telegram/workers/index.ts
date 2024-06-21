import moduleDiscord from 'telegram/modules/discord';
import clearMessages from './clearMessages';

(async () => {
  const doWork = async () => {
    clearMessages();
    moduleDiscord.subscribers.updateStatusMessage();

    setTimeout(() => doWork(), 5000);
  };

  doWork();
})();
