import QRCodeStyling from 'qr-code-styling';

export const QrUtil = {
    generateQrCode: (link: string, size: number = 300) => {
        return new QRCodeStyling({
            width: size,
            height: size,
            data: link,
            image: '/images/botaniq-no-bg.png',
            dotsOptions: {
                color: '#355749 ',
                type: 'rounded',
            },
            imageOptions: {
                crossOrigin: 'anonymous',
                margin: 20,
            },
        });
    },
};
export default QrUtil;
