import clearMessages from './clearMessages';
import pinger from './pinger';

(async () => {
  const doWork = async () => {
    clearMessages();

    setTimeout(() => doWork(), 5000);
  };

  const doWork2 = async () => {
    pinger();

    setTimeout(() => doWork2(), 60000);
  };

  doWork();
  doWork2();
})();
