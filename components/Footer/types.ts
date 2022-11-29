export type FooterText = {
    header: string;
    text: string;
    link: string;
    image: string;
    class: string;
}

export type FooterColumn = Array<Partial<FooterText>>