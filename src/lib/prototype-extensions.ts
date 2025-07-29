export function initializePrototypeExtensions() {
    Object.defineProperty(String.prototype, 'ww_slugify', {
        value: function () {
            return this.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
        },
        writable: true,
        configurable: true,
        enumerable: false,
	});
	Object.defineProperty(Number.prototype, 'toPriceFormat', {
		value: function (decimalDigits: number = 0) {
			if (isNaN(this)) return '0,00 €';
            return this.toLocaleString('es-ES', {
                style: 'currency',
				currency: 'EUR',
				minimumFractionDigits: 0,
				maximumFractionDigits: decimalDigits
            });
        },
        writable: true,
        configurable: true,
        enumerable: false,
    });
    Object.defineProperty(Date.prototype, 'ww_getFullDateTime', {
        value: function () {
            return this.toISOString().replace('T', ' ').replace('Z', '');
        },
        writable: true,
        configurable: true,
        enumerable: false,
    });
    Object.defineProperty(Date.prototype, 'ww_getFullDate', {
        value: function (includeHours: boolean = false) {
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            if (includeHours) {
                options.hour = 'numeric';
                options.minute = 'numeric';
                options.second = 'numeric';
            }

            return this.toLocaleDateString('es-ES', options);
        },
        writable: true,
        configurable: true,
        enumerable: false,
    });

    Object.defineProperty(Date.prototype, 'getPartialDateDatas', {
        value: function () {
            return {
                m: String(this.getMonth() + 1).padStart(2, '0'),
                d: String(this.getDate()).padStart(2, '0'),
                Y: this.getFullYear(),
                H: String(this.getHours()).padStart(2, '0'),
                i: String(this.getMinutes()).padStart(2, '0'),
                s: String(this.getSeconds()).padStart(2, '0'),
            };
        },
        writable: true,
        configurable: true,
        enumerable: false,
    });

    Object.defineProperty(Date.prototype, 'ww_format', {
        value: function (format: string = 'd/m/Y H:i:s') {
            const map = this.getPartialDateDatas();
            return format.replace(/m|d|Y|H|i|s/g, matched => map[matched]);
        },
        writable: true,
        configurable: true,
        enumerable: false,
    });

    Object.defineProperty(Array.prototype, 'ww_first', {
        value: function () {
            return this.length > 0 ? this[0] : undefined;
        },
        writable: true,
        configurable: true,
        enumerable: false,
    });

    Object.defineProperty(Array.prototype, 'ww_last', {
        value: function () {
            return this.length > 0 ? this[this.length - 1] : undefined;
        },
        writable: true,
        configurable: true,
        enumerable: false,
    });

    Object.defineProperty(Array.prototype, 'ww_unique', {
        value: function () {
            return [...new Set(this)];
        },
        writable: true,
        configurable: true,
        enumerable: false,
    });

    console.log('Prototype extensions initialized!');
}
