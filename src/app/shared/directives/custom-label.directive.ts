import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit{

  private htmlElemnt?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
    console.log(value);
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    // console.log('constructor de la directiva')
    // console.log(el)
    this.htmlElemnt = el;
    // this.htmlElemnt.nativeElement.innerHTML = "Hola Mundo";
  }

  ngOnInit(): void {
    // console.log('Directiva NgOnInit');
    this.setStyle();
  }

  setStyle():void {
    if( !this.htmlElemnt ) return;

    this.htmlElemnt!.nativeElement.style.color = this._color;
  }

  setErrorMessage():void {
    if( !this.htmlElemnt ) return;
    if( !this._errors ){
      this.htmlElemnt.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors);
    if( errors.includes('required') ){
      this.htmlElemnt.nativeElement.innerText = 'Este campo es requerido';
      return;
    }

    if( errors.includes('minlength') ){
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      this.htmlElemnt.nativeElement.innerText = `Mínimo ${current}/${min}`;
      return;
    }

    if( errors.includes('email') ){
      this.htmlElemnt.nativeElement.innerText = 'No tiene formato de email';
      return;
    }



  }

}
