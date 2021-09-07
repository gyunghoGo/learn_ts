{
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
        hasSugar?: boolean;
    };


    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeeCup;
    }

    //상속의 문제점은 상속의 깊이가 깊어질수록 서로간의 관계가 복잡해 질수 있다. 

    class CoffeeMachine implements CoffeeMaker {
        private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
        protected coffeeBeans: number = 0; // instance (object) level
        // 내부에서 private으로 외부에서 변경할 수 없게 숨겨(?) 놓는다. 

        constructor(
            coffeeBeans: number, 
            private milk: MilkFrother, 
            private sugar: SugarProvider
            ){
            this.coffeeBeans = coffeeBeans;
        }

        public fillCoffeeBeans(beans: number){ // 이 함수를 이용해서 내부의 상태를 변경 할 수 있다. 
            if(beans < 0){
                throw new Error('value for beans should be greater than 0');
            } 
            this.coffeeBeans += beans;
        }


        private grindBeans(shots: number) {
            if(this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT){
                throw new Error('Not enougth coffee beans!');
            }
            this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
        }
        private preheat():void{
            console.log('heating up....!');
        }

        private extract(shots: number): CoffeeCup{
            console.log(`Pulling ${shots} shots... `);
            return {
                shots,
                hasMilk: false,
            };
        }

        makeCoffee(shots: number): CoffeeCup{
            this.grindBeans(shots);
            this.preheat();
            const coffee = this.extract(shots);
            const sugarAdded = this.sugar.addSugar(coffee);
            return this.milk.makeMilk(sugarAdded);
        }
    }

    interface MilkFrother {
        makeMilk(cup: CoffeeCup):CoffeeCup;
    }
    interface SugarProvider {
        addSugar(cup: CoffeeCup): CoffeeCup;
    }

    // 싸구려 우유 거품기
    class CheapMilkSteamer implements MilkFrother{
        private steamMilk():void {
            console.log('Steaming some milk...')
        }
        makeMilk(cup: CoffeeCup):CoffeeCup{
            this.steamMilk();
            return {
                ...cup,
                hasMilk: true,
            };
        }
    }
    class FancyMilkSteamer implements MilkFrother{
        private steamMilk():void {
            console.log('Fancy Steaming some milk...')
        }
        makeMilk(cup: CoffeeCup):CoffeeCup{
            this.steamMilk();
            return {
                ...cup,
                hasMilk: true,
            };
        }
    }
    class ColdMilkSteamer implements MilkFrother{
        private steamMilk():void {
            console.log('Fancy Steaming some milk...')
        }
        makeMilk(cup: CoffeeCup):CoffeeCup{
            this.steamMilk();
            return {
                ...cup,
                hasMilk: true,
            };
        }
    }

    class NoMilk implements MilkFrother{
        makeMilk(cup: CoffeeCup): CoffeeCup{
            return cup;
        }
    }
    //설탕 제조기
    class CandySugarMixer implements SugarProvider{
        private getSugar(){
            console.log('getting some sugar from candy');
            return true;
        }
        addSugar(cup: CoffeeCup): CoffeeCup{
            const sugar = this.getSugar();
            return {
                ...cup,
                hasSugar: sugar,
            }
        }
    }
    class SugarMixer implements SugarProvider{
        private getSugar(){
            console.log('getting some sugar from jar!!!');
            return true;
        }
        addSugar(cup: CoffeeCup): CoffeeCup{
            const sugar = this.getSugar();
            return {
                ...cup,
                hasSugar: sugar,
            }
        }
    }
    class NoSugar implements SugarProvider {
        addSugar(cup: CoffeeCup): CoffeeCup{
            return cup;
        }
    }
    



    //Milk
    const cheapMilkMaker = new CheapMilkSteamer();
    const fancyMilkMaker = new FancyMilkSteamer();
    const coldMilkMaker = new ColdMilkSteamer();
    const noMilk = new NoMilk();

    //Sugar
    const candySugar = new CandySugarMixer();
    const sugar = new SugarMixer();
    const noSugar = new NoSugar();

    const sweetCandyMachine = new CoffeeMachine(12, noMilk, candySugar);
    const sweetMachine = new CoffeeMachine(12, noMilk, sugar); 
    const latteMacine = new CoffeeMachine(12, cheapMilkMaker, noSugar);
    const coldLatteMachine = new CoffeeMachine(12, coldMilkMaker, noSugar);
    const sweetLatteMacine = new  CoffeeMachine(
        12, cheapMilkMaker, candySugar
    );
}