import { Injectable } from '@nestjs/common';
import { CommonsUtil } from '@utils';
import { from, Observable, switchMap } from 'rxjs';
import * as sharp from 'sharp';
import { Modulate, Sharpen, Threshold, Clahe } from '@models';

@Injectable()
export class FiltersBuilder {
  private imageProcessor = sharp;

  constructor() {
    this.imageProcessor.cache(false);
  }

  setBlur(
    imageBuffer$: Observable<Buffer>,
    blurValue: number,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imgBuffer) =>
        from(this.imageProcessor(imgBuffer).blur(blurValue).toBuffer()),
      ),
    );
  }

  setMedian(
    imageBuffer$: Observable<Buffer>,
    medianValue: number,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(this.imageProcessor(imageBuffer).median(medianValue).toBuffer()),
      ),
    );
  }

  setGamma(
    imageBuffer$: Observable<Buffer>,
    gammaValue: number,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(this.imageProcessor(imageBuffer).gamma(gammaValue).toBuffer()),
      ),
    );
  }

  setNormalise(imageBuffer$: Observable<Buffer>): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(this.imageProcessor(imageBuffer).normalise().toBuffer()),
      ),
    );
  }

  setTint(imageBuffer$: Observable<Buffer>, tint: string): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(
          this.imageProcessor(imageBuffer)
            .tint(CommonsUtil.convertHexToRGBA(tint))
            .toBuffer(),
        ),
      ),
    );
  }

  setGrayScale(imageBuffer$: Observable<Buffer>): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(this.imageProcessor(imageBuffer).grayscale().toBuffer()),
      ),
    );
  }

  setNegate(imageBuffer$: Observable<Buffer>): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(this.imageProcessor(imageBuffer).negate().toBuffer()),
      ),
    );
  }

  setFlatten(
    imageBuffer$: Observable<Buffer>,
    transparencyColor: string,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(
          this.imageProcessor(imageBuffer)
            .flatten({
              background: CommonsUtil.convertHexToRGBA(transparencyColor),
            })
            .toBuffer(),
        ),
      ),
    );
  }

  setClahe(imageBuffer$: Observable<Buffer>, clahe: Clahe): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(this.imageProcessor(imageBuffer).clahe(clahe).toBuffer()),
      ),
    );
  }

  setThreshold(
    imageBuffer$: Observable<Buffer>,
    threshold: Threshold,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(
          this.imageProcessor(imageBuffer)
            .threshold(threshold.threshold, { grayscale: threshold.grayscale })
            .toBuffer(),
        ),
      ),
    );
  }

  setModulate(
    imageBuffer$: Observable<Buffer>,
    modulate: Modulate,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(this.imageProcessor(imageBuffer).modulate(modulate).toBuffer()),
      ),
    );
  }

  setSharpen(
    imageBuffer$: Observable<Buffer>,
    sharpen: Sharpen,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(
          this.imageProcessor(imageBuffer)
            .sharpen(sharpen.sigma, sharpen.flat, sharpen.jagged)
            .toBuffer(),
        ),
      ),
    );
  }

  setTransparencyColor(
    imageBuffer$: Observable<Buffer>,
    transparencyColor: string,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(
          this.imageProcessor(imageBuffer)
            .flatten({ background: transparencyColor })
            .toBuffer(),
        ),
      ),
    );
  }

  setRecomb(
    imageBuffer$: Observable<Buffer>,
    recombMatrix: sharp.Matrix3x3,
  ): Observable<any> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) => {
        return from(
          this.imageProcessor(imageBuffer).recomb(recombMatrix).toBuffer(),
        );
      }),
    );
  }
}
