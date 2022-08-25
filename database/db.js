db.createUser({
  user: 'admin',
  pwd: 'adminPassword123',
  roles: [
    {
      role: 'readWrite',
      db: 'PERFECT_IMAGE_TOOLS',
    },
  ],
});

db = db.getSiblingDB('PERFECT_IMAGE_TOOLS');

db.createCollection('EFFECTS');

db.EFFECTS.insertMany([
  {
    name: 'hold',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 2.2,
        tint: '',
        transparencyColor: '',
        normalise: false,
        grayscale: false,
        negate: false,
        clahe: {
          width: 100,
          height: 100,
          maxSlope: 35,
        },
        threshold: {
          threshold: 0,
          grayscale: false,
        },
        modulate: {
          brightness: 1,
          saturation: 1,
          hue: 0,
          lightness: 0,
        },
        sharpen: {
          sigma: 0.1,
          flat: 1,
          jagged: 2,
        },
      },
    },
    createdAt: ISODate('2022-08-22T16:00:36.439Z'),
    updatedAt: ISODate('2022-08-22T16:00:36.439Z'),
  },
  {
    name: 'effect name 3',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 2.2,
        tint: '#00FFFFFF',
        transparencyColor: '#00FFFFFF',
        normalise: false,
        grayscale: false,
        negate: false,
        clahe: {
          width: 100,
          height: 100,
          maxSlope: 3,
        },
        threshold: {
          threshold: 0,
          grayscale: false,
        },
        modulate: {
          brightness: 1,
          saturation: 1,
          hue: 0,
          lightness: 0,
        },
        sharpen: {
          sigma: 0.1,
          flat: 1,
          jagged: 2,
        },
      },
      cropProperties: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      },
      rotationProperties: {
        angle: 0,
        transparencyColor: '',
        horizontalFlip: false,
        verticalFlip: false,
      },
    },
    createdAt: ISODate('2022-08-22T20:42:26.672Z'),
    updatedAt: ISODate('2022-08-22T20:42:26.672Z'),
  },
  {
    name: 'finish',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 2.2,
        tint: '#fcba03',
        transparencyColor: '',
        normalise: false,
        grayscale: false,
        negate: false,
        clahe: {
          width: 100,
          height: 100,
          maxSlope: 3,
        },
        threshold: {
          threshold: 0,
          grayscale: false,
        },
        modulate: {
          brightness: 1,
          saturation: 1,
          hue: 0,
          lightness: 0,
        },
        sharpen: {
          sigma: 0.1,
          flat: 1,
          jagged: 2,
        },
      },
    },
    createdAt: ISODate('2022-08-22T21:35:35.353Z'),
    updatedAt: ISODate('2022-08-22T21:35:35.353Z'),
  },
  {
    name: 'fence',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 2.2,
        tint: '',
        transparencyColor: '',
        normalise: false,
        grayscale: true,
        negate: false,
        clahe: {
          width: 100,
          height: 100,
          maxSlope: 3,
        },
        threshold: {
          threshold: 0,
          grayscale: false,
        },
        modulate: {
          brightness: 1,
          saturation: 1,
          hue: 0,
          lightness: 0,
        },
        sharpen: {
          sigma: 0.1,
          flat: 1,
          jagged: 2,
        },
      },
    },
    createdAt: ISODate('2022-08-22T21:36:11.627Z'),
    updatedAt: ISODate('2022-08-22T21:36:11.627Z'),
  },
  {
    name: 'film',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 2.2,
        tint: '',
        transparencyColor: '',
        normalise: false,
        grayscale: false,
        negate: true,
        clahe: {
          width: 100,
          height: 100,
          maxSlope: 3,
        },
        threshold: {
          threshold: 0,
          grayscale: false,
        },
        modulate: {
          brightness: 1,
          saturation: 1,
          hue: 0,
          lightness: 0,
        },
        sharpen: {
          sigma: 0.1,
          flat: 1,
          jagged: 2,
        },
      },
    },
    createdAt: ISODate('2022-08-22T21:36:21.254Z'),
    updatedAt: ISODate('2022-08-22T21:36:21.254Z'),
  },
  {
    name: 'review',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 2.2,
        tint: '',
        transparencyColor: '',
        normalise: false,
        grayscale: false,
        negate: false,
        clahe: {
          width: 100,
          height: 100,
          maxSlope: 3,
        },
        threshold: {
          threshold: 0,
          grayscale: false,
        },
        modulate: {
          brightness: 1,
          saturation: 1.38277,
          hue: 73,
          lightness: 0,
        },
        sharpen: {
          sigma: 0.1,
          flat: 1,
          jagged: 2,
        },
      },
    },
    createdAt: ISODate('2022-08-22T21:36:47.067Z'),
    updatedAt: ISODate('2022-08-22T21:36:47.067Z'),
  },
  {
    name: 'quick',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 2.2,
        tint: '',
        transparencyColor: '',
        normalise: false,
        grayscale: false,
        negate: false,
        clahe: {
          width: 100,
          height: 100,
          maxSlope: 3,
        },
        threshold: {
          threshold: 0,
          grayscale: false,
        },
        modulate: {
          brightness: 1,
          saturation: 1,
          hue: 0,
          lightness: 0,
        },
        sharpen: {
          sigma: 16.5,
          flat: 1.9,
          jagged: 2,
        },
      },
    },
    createdAt: ISODate('2022-08-22T21:37:26.286Z'),
    updatedAt: ISODate('2022-08-22T21:37:26.286Z'),
  },
  {
    name: 'quick',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 2.2,
        tint: '',
        transparencyColor: '',
        normalise: false,
        grayscale: false,
        negate: false,
        clahe: {
          width: 100,
          height: 100,
          maxSlope: 3,
        },
        threshold: {
          threshold: 0,
          grayscale: false,
        },
        modulate: {
          brightness: 1,
          saturation: 1,
          hue: 0,
          lightness: 0,
        },
        sharpen: {
          sigma: 16.5,
          flat: 1.9,
          jagged: 2,
        },
      },
    },
    createdAt: ISODate('2022-08-22T21:37:26.286Z'),
    updatedAt: ISODate('2022-08-22T21:37:26.286Z'),
  },
  {
    name: 'are',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 2.2,
        tint: '#fcba03',
        transparencyColor: '',
        normalise: false,
        grayscale: false,
        negate: false,
        clahe: {
          width: 100,
          height: 100,
          maxSlope: 3,
        },
        threshold: {
          threshold: 133,
          grayscale: true,
        },
        modulate: {
          brightness: 1,
          saturation: 1,
          hue: 0,
          lightness: 0,
        },
        sharpen: {
          sigma: 0.1,
          flat: 1,
          jagged: 2,
        },
      },
    },
    createdAt: ISODate('2022-08-22T21:38:36.035Z'),
    updatedAt: ISODate('2022-08-22T21:38:36.035Z'),
  },
  {
    name: 'matter',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 3,
        tint: '',
        transparencyColor: '',
        normalise: true,
        grayscale: false,
        negate: false,
        clahe: {
          width: 77,
          height: 77,
          maxSlope: 5,
        },
        threshold: {
          threshold: 0,
          grayscale: false,
        },
        modulate: {
          brightness: 1.19238,
          saturation: 1.46293,
          hue: 0,
          lightness: -4,
        },
        sharpen: {
          sigma: 0.1,
          flat: 1,
          jagged: 2,
        },
      },
    },
    createdAt: ISODate('2022-08-22T21:46:58.513Z'),
    updatedAt: ISODate('2022-08-22T21:46:58.513Z'),
  },
  {
    name: 'everyone',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 2.2,
        tint: '#fc0303',
        transparencyColor: '',
        normalise: false,
        grayscale: false,
        negate: false,
        clahe: {
          width: 100,
          height: 100,
          maxSlope: 3,
        },
        threshold: {
          threshold: 0,
          grayscale: false,
        },
        modulate: {
          brightness: 1,
          saturation: 1,
          hue: 0,
          lightness: 0,
        },
        sharpen: {
          sigma: 0.1,
          flat: 1,
          jagged: 2,
        },
      },
    },
    createdAt: ISODate('2022-08-22T21:47:53.956Z'),
    updatedAt: ISODate('2022-08-22T21:47:53.956Z'),
  },
  {
    name: 'differ',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 2.2,
        tint: '#fcf403',
        transparencyColor: '',
        normalise: false,
        grayscale: false,
        negate: false,
        clahe: {
          width: 100,
          height: 100,
          maxSlope: 3,
        },
        threshold: {
          threshold: 0,
          grayscale: false,
        },
        modulate: {
          brightness: 1,
          saturation: 1,
          hue: 0,
          lightness: 0,
        },
        sharpen: {
          sigma: 0.1,
          flat: 1,
          jagged: 2,
        },
      },
    },
    createdAt: ISODate('2022-08-22T21:48:04.437Z'),
    updatedAt: ISODate('2022-08-22T21:48:04.437Z'),
  },
  {
    name: 'hot',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 2.2,
        tint: '#03fc20',
        transparencyColor: '',
        normalise: false,
        grayscale: false,
        negate: false,
        clahe: {
          width: 100,
          height: 100,
          maxSlope: 3,
        },
        threshold: {
          threshold: 0,
          grayscale: false,
        },
        modulate: {
          brightness: 1,
          saturation: 1,
          hue: 0,
          lightness: 0,
        },
        sharpen: {
          sigma: 0.1,
          flat: 1,
          jagged: 2,
        },
      },
    },
    createdAt: ISODate('2022-08-22T21:48:15.302Z'),
    updatedAt: ISODate('2022-08-22T21:48:15.302Z'),
  },
  {
    name: 'practice',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 2.2,
        tint: '#03f0fc',
        transparencyColor: '',
        normalise: false,
        grayscale: false,
        negate: false,
        clahe: {
          width: 100,
          height: 100,
          maxSlope: 3,
        },
        threshold: {
          threshold: 0,
          grayscale: false,
        },
        modulate: {
          brightness: 1,
          saturation: 1,
          hue: 0,
          lightness: 0,
        },
        sharpen: {
          sigma: 0.1,
          flat: 1,
          jagged: 2,
        },
      },
    },
    createdAt: ISODate('2022-08-22T21:48:23.321Z'),
    updatedAt: ISODate('2022-08-22T21:48:23.321Z'),
  },
  {
    name: 'coal',
    imageProperties: {
      filters: {
        median: 0,
        blur: 0.3,
        gamma: 2.2,
        tint: '#d203fc',
        transparencyColor: '',
        normalise: false,
        grayscale: false,
        negate: false,
        clahe: {
          width: 100,
          height: 100,
          maxSlope: 3,
        },
        threshold: {
          threshold: 0,
          grayscale: false,
        },
        modulate: {
          brightness: 1,
          saturation: 1,
          hue: 0,
          lightness: 0,
        },
        sharpen: {
          sigma: 0.1,
          flat: 1,
          jagged: 2,
        },
      },
    },
    createdAt: ISODate('2022-08-22T21:48:36.792Z'),
    updatedAt: ISODate('2022-08-22T21:48:36.792Z'),
  },
]);
