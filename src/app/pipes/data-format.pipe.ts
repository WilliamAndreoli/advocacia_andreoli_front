import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFormat',
  standalone: true
})
export class DataFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    // Remove o T e tudo após os minutos
    return value.replace('T', ' ').substring(0, 16);
  }
}