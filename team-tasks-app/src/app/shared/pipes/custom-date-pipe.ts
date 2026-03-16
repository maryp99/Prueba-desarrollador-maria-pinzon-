import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return 'Sin fecha';
    
    const date = new Date(value);
    
    // Validar que la fecha sea válida
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
    
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    // Fechas futuras
    if (diffTime < 0) {
      const futureDays = Math.abs(diffDays);
      if (futureDays === 0) return '🔜 Hoy';
      if (futureDays === 1) return '🔜 Mañana';
      if (futureDays <= 7) return `🔜 En ${futureDays} días`;
      return `📅 ${date.toLocaleDateString('es-ES')}`;
    }

    // Fechas pasadas
    if (diffMinutes < 1) return '🕐 Justo ahora';
    if (diffMinutes < 60) return `🕐 Hace ${diffMinutes} min`;
    if (diffHours < 24) return `🕐 Hace ${diffHours}h`;
    if (diffDays === 0) return '🔥 Hoy';
    if (diffDays === 1) return '⚠️ Ayer';
    if (diffDays <= 7) return `📅 Hace ${diffDays} días`;
    if (diffDays <= 30) return `📅 Hace ${Math.floor(diffDays / 7)} semanas`;
    
    return `📅 ${date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    })}`;
  }
}