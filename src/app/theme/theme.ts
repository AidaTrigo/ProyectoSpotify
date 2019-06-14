export class Theme {

    public themeLight: boolean;
    public cards: string;
    public cardsText: string;
    public labels: string;
    public background: string;
    public bg: string;
    public text: string;
    public navbar: string;
    public oppositeColor: string;

    constructor() {}

    setTheme(theme: string) {
        if (theme === 'dark') { // dark
            this.themeLight = false;
            this.cards = '';
            this.cardsText = 'text-dark'; // #343a40
            this.labels = 'success';
            this.background = 'darkTheme';
            this.bg = 'dark';
            this.text = 'text-white'; // #f8f9fa
            this.navbar = 'navbar-dark bg-dark';
            this.oppositeColor = 'white';
        } else { // light
            this.themeLight = true;
            this.cards = 'text-white bg-success';
            this.cardsText = 'text-white';
            this.labels = 'light';
            this.bg = 'light';
            this.background = 'bg-white';
            this.text = 'text-dark';
            this.navbar = 'navbar-light bg-light';
            this.oppositeColor = 'black';
        }
    }
}
