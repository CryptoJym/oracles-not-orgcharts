const blocks = document.querySelectorAll('[data-copy]');

blocks.forEach((block) => {
  const button = block.querySelector('[data-copy-btn]');
  const code = block.querySelector('pre');
  if (!button || !code) return;

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.innerText.trim());
      const original = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => {
        button.textContent = original;
      }, 1200);
    } catch (err) {
      console.error('Copy failed', err);
    }
  });
});
