import localFont from 'next/font/local';

export const geist = localFont({
    src: [
        {
            path: './Geist-Regular.ttf',
            weight:  'normal',
            style: 'normal',
        }
    ],
    variable: "--geist",
    fallback: ["sans"],
});
