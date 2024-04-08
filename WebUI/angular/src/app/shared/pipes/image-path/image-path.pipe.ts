import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@app-environment';

@Pipe({ name: 'imagePath' })
export class ImagePathPipe implements PipeTransform {
    transform(title: string, bgImage = false): string {
        const path = `${environment.IMAGE_PATH}/${title}`;

        if (bgImage) {
            return `url('${path}')`;
        }

        return path;
    }
}
