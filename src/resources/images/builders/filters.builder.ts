import { Injectable } from '@nestjs/common';
import { CommonsUtil } from 'libs/commons/src/utils/commons.util';
import { from, Observable, switchMap } from 'rxjs';
import * as sharp from 'sharp';
import { Clahe } from 'src/models/clahe.model';
import { Modulate } from 'src/models/modulate.model';
import { Sharpen } from 'src/models/sharpen.model';
import { Threshold } from 'src/models/threshold.model';

@Injectable()
export class FiltersBuilder {
  setBlur(
    imageBuffer$: Observable<Buffer>,
    blurValue: number,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imgBuffer) =>
        from(sharp(imgBuffer).blur(blurValue).toBuffer()),
      ),
    );
  }

  setMedian(
    imageBuffer$: Observable<Buffer>,
    medianValue: number,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(sharp(imageBuffer).median(medianValue).toBuffer()),
      ),
    );
  }

  setGamma(
    imageBuffer$: Observable<Buffer>,
    gammaValue: number,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(sharp(imageBuffer).gamma(gammaValue).toBuffer()),
      ),
    );
  }

  setNormalise(imageBuffer$: Observable<Buffer>): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(sharp(imageBuffer).normalise().toBuffer()),
      ),
    );
  }

  setTint(imageBuffer$: Observable<Buffer>, tint: string): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(
          sharp(imageBuffer)
            .tint(CommonsUtil.convertHexToRGBA(tint))
            .toBuffer(),
        ),
      ),
    );
  }

  setGrayScale(imageBuffer$: Observable<Buffer>): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(sharp(imageBuffer).grayscale().toBuffer()),
      ),
    );
  }

  setNegate(imageBuffer$: Observable<Buffer>): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) => from(sharp(imageBuffer).negate().toBuffer())),
    );
  }

  setFlatten(
    imageBuffer$: Observable<Buffer>,
    transparencyColor: string,
  ): Observable<Buffer> {
    return imageBuffer$.pipe(
      switchMap((imageBuffer) =>
        from(
          sharp(imageBuffer)
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
        from(sharp(imageBuffer).clahe(clahe).toBuffer()),
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
          sharp(imageBuffer)
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
        from(sharp(imageBuffer).modulate(modulate).toBuffer()),
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
          sharp(imageBuffer)
            .sharpen(sharpen.sigma, sharpen.flat, sharpen.jagged)
            .toBuffer(),
        ),
      ),
    );
  }
}
