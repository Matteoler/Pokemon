import localFont from 'next/font/local';

export const nohemi = localFont({
    src: [
        {
            path: './Nohemi-Regular.ttf',
            weight: 'normal',
            style: 'normal',
        },
        {
            path: './Nohemi-ExtraBold.ttf',
            weight: '800',
            style: 'normal',
        }
    ],
    variable: "--nohemi",
    fallback: ["sans"],
});
