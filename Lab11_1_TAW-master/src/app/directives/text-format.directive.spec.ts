
import { TextFormatDirective } from './text-format.directive';
import { ElementRef } from '@angular/core';

describe('TextFormatDirective', () => {
  let elementRefMock: ElementRef;
  let directive: TextFormatDirective;

  beforeEach(() => {
    elementRefMock = new ElementRef({ value: 'TeSt' });
    directive = new TextFormatDirective(elementRefMock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should format text to lowercase on blur', () => {
    directive.onBlur();
    expect(elementRefMock.nativeElement.value).toBe('test');
  });
});
