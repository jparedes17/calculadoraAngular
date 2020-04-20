import { Component, HostListener } from '@angular/core';

export enum KEY_CODE {
  DIGIT0 = 48,
  DIGIT1 = 49,
  DIGIT2 = 50,
  DIGIT3 = 51,
  DIGIT4 = 52,
  DIGIT5 = 53,
  DIGIT6 = 54,
  DIGIT7 = 55,
  DIGIT8 = 56,
  DIGIT9 = 57,
  PERIOD = 190,
  SPACEBACK = 8,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subText = '';
  mainText = '';
  operand1: number;
  operand2: number;
  operator = '';
  calculationString = '';
  answered = false;
  operatorSet = false;
  operatorSet2 = false;
  equalFin = false;

  pressKey(key: string) {
    if (this.operatorSet) {
      if (this.equalFin) {
        this.allClear();
        this.mainText = key;
      } else {
        this.mainText += key;
        this.operatorSet = false;
      }
    } else {
      this.mainText === '0' ? this.mainText = key : this.mainText += key;
    }
  }

  pressKey2() {
    if (this.mainText.includes('.')) {
      const lastKey2 = this.mainText[this.mainText.length - 1];
      if (lastKey2 === '.') {
        this.operatorSet2 = true;
      }
      if ((this.operatorSet2) || (this.mainText === '')) {
        this.operatorSet2 = false;
        return;
      }
    }
    if (this.mainText.length == 10) {
      return
    }

    this.mainText += '.';
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.keyCode === KEY_CODE.DIGIT0) {
      if (this.mainText.length == 10) {
        return
      }
      this.mainText += '1';
    } else if (event.keyCode === KEY_CODE.DIGIT1) {
      if (this.mainText.length == 10) {
        return
      }
      this.mainText += '1';
    } else if (event.keyCode === KEY_CODE.DIGIT2) {
      if (this.mainText.length == 10) {
        return
      }
      this.mainText += '2';
    } else if (event.keyCode === KEY_CODE.DIGIT3) {
      if (this.mainText.length == 10) {
        return
      }
      this.mainText += '3';
    } else if (event.keyCode === KEY_CODE.DIGIT4) {
      if (this.mainText.length == 10) {
        return
      }
      this.mainText += '4';
    } else if (event.keyCode === KEY_CODE.DIGIT5) {
      if (this.mainText.length == 10) {
        return
      }
      this.mainText += '5';
    } else if (event.keyCode === KEY_CODE.DIGIT6) {
      if (this.mainText.length == 10) {
        return
      }
      this.mainText += '6';
    } else if (event.keyCode === KEY_CODE.DIGIT7) {
      if (this.mainText.length == 10) {
        return
      }
      this.mainText += '7';
    } else if (event.keyCode === KEY_CODE.DIGIT8) {
      if (this.mainText.length == 10) {
        return
      }
      this.mainText += '8';
    } else if (event.keyCode === KEY_CODE.DIGIT9) {
      if (this.mainText.length == 10) {
        return
      }
      this.mainText += '9';
    }else if (event.keyCode === KEY_CODE.SPACEBACK) {
      if (this.mainText.length == 10) {
        return
      }
     this.allClear();
    }else if (event.keyCode === KEY_CODE.PERIOD) {
      if (this.mainText.length == 10) {
        return
      }
      this.pressKey2();
    }
  }

  operation(symbol, operand2) {
    switch (symbol) {
      case '-':
        return this.operand1 -= operand2;
      case '+':
        return this.operand1 += operand2;
      case 'x':
        return this.operand1 *= operand2;
      case '/':
        return this.operand1 /= operand2;
      case '=':
        return operand2;
    }
  }

  allClear() {
    this.mainText = '';
    this.subText = '';
    this.operand1 = null;
    this.operator = null;
    this.operatorSet = false;
    this.equalFin = false;
  }


  getanswer(symbol: string) {
    this.calculationString = this.mainText;
    if (this.operand1 === null) {
      this.operand1 = Number(this.mainText);
    } else if (this.operator) {
      if (this.mainText.includes('-')) {
        const result = this.operation(this.operator, (this.mainText.substring(String(this.operand1).length + 1)))
        this.mainText = String(result);
        this.operand1 = result;
        this.subText = this.calculationString;
        if (this.mainText.length > 9) {
          this.mainText = this.mainText.substr(0, 9);
        }
      } else if (this.mainText.includes('/')) {
        const result = this.operation(this.operator, (this.mainText.substring(String(this.operand1).length + 1)))
        this.mainText = String(result);
        this.operand1 = result;
        this.subText = this.calculationString;
        if (this.mainText.length > 9) {
          this.mainText = this.mainText.substr(0, 9);
        }
      } else if (this.mainText.includes('x')) {
        const result = this.operation(this.operator, (this.mainText.substring(String(this.operand1).length + 1)))
        this.mainText = String(result);
        this.operand1 = result;
        this.subText = this.calculationString;
        if (this.mainText.length > 9) {
          this.mainText = this.mainText.substr(0, 9);
        }
      } else if (this.mainText.includes('+')) {
        const result = this.operation(this.operator, Number(this.mainText.substring(String(this.operand1).length + 1)))
        this.mainText = String(result);
        this.operand1 = result;
        this.subText = this.calculationString;
        if (this.mainText.length > 9) {
          this.mainText = this.mainText.substr(0, 9);
        }
      }
    }
    this.operator = symbol;
    this.operatorSet = false;
    if (this.operator !== '=') {
      this.mainText += this.operator;
    }
  }
}
