// my-text-component.js
class MyTextComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                h1, p {
                    margin: 0;
                    padding: 10px;
                    cursor: pointer;
                }
                h1:focus, p:focus {
                    outline: 2px solid blue;
                }
            </style>
            <h1 tabindex="0" aria-label="Заголовок">Заголовок</h1>
            <p tabindex="0" aria-label="Абзац текста">Это абзац текста.</p>
        `;
    }

    addEventListeners() {
        const elements = this.shadowRoot.querySelectorAll('h1, p');
        elements.forEach(element => {
            element.addEventListener('focus', () => this.speak(element.textContent));
        });
    }

    speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ru-RU'; // Установка языка на русский
        window.speechSynthesis.speak(utterance);
    }
}

customElements.define('my-text-component', MyTextComponent);
