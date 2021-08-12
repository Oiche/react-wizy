import { createRef } from 'react';
import Wizy from 'react-wizy';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import Step6 from './steps/Step6';
import Step7 from './steps/Step7';

function App() {
    const flow = [
        {
            name: 'Step1',
            component: <Step1 />,
        },
        { 
            name: 'Step2',
            component: <Step2 />
        },
        {
            name: 'Step3',
            component: <Step3 />
        },
        {
            name: 'Step4',
            component: <Step4 />
        },
        {
            name: 'Step5',
            component: <Step5 />
        },
        {
            name: 'Step6',
            component: <Step6 />
        },
        {
            name: 'Step7',
            component: <Step7 />
        }
    ]
    const ref = createRef<Wizy>()
    return (
        <div className="App">
            <Wizy 
                ref={ref}
                flow={flow}
                onPreviousStepChanging={() => { console.log('Previous changing') }}
                onPreviousStepChanged={() => { console.log('Previous changed') }}
                onNextStepChanging={() => { console.log('Next changing') }}
                onNextStepChanged={() => { console.log('Next changed') }}
            />
            <button onClick={() => {ref.current?.previous()}}>Previous</button>
            <button onClick={() => {ref.current?.next()}}>Next</button>
        </div>
    );
}

export default App;
