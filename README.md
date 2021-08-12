# React Wizy
```
is an advanced multi-step, wizard component. 

It has classical wizard features plus dynamic step skip functionalities and step changing management.
```

#### What's new
```
v1.0.0 - First release!
```

## Get started
- Install
```
npm install --save react-wizy
```

- Import into project via
```javascript
import Wizy from 'react-wizy';
```

- Define a flow of components you want to step through
```javascript
const flow =
    [
        {name: 'Step1', component: <Step1 />},
        {name: 'Step2', component: <Step2 />},
        {name: 'Step3', component: <Step3 />},
        {name: 'Step4', component: <Step4 />},
        {name: 'Step5', component: <Step5 />}
    ]
```

- Render it
```javascript
<div className='wizy-container'>
    <Wizy flow={flow} />
</div>
```

- Add following options to customize it further
```
// specify what step to start from
startAtStep: number (array index) | string (step name)

// event fired when wizard is changing to previous step
// can block the changing execution returning: false
onPreviousStepChanging?: (step) => boolean | void

// event fired when wizard is changed to previous step
onPreviousStepChanged?: (step) => void

// event fired when wizard is changed to next step
// can block the changing execution returning: false
onNextStepChanging?: (step) => boolean | void

// event fired when wizard is changed to next step
onNextStepChanged?: (step) => void
```

## Advanced Example

```javascript
const flow =
    [
        {
            name: 'Step1', 
            component: <Step1 />
        },
        {
            name: 'Step2',
            component: <Step2 />,
            next: () => {
                const result = Math.floor(Math.random() * 2) + 1
                if (result === 1) {
                    return 2 // Step3
                } else if (result === 2) {
                    return 'Step4'
                }
            }
        },
        {
            name: 'Step3', 
            component: <Step3 />
            next: 'Step5'
        },
        {
            name: 'Step4', 
            component: <Step4 />
            next: 6 // Step7
        },
        {
            name: 'Step5', 
            component: <Step5 />,
        },
        {
            name: 'Step6', 
            component: <Step6 />
        },
        {
            name: 'Step7',
            component: <Step7 />
            previous: 'Step5'
        }
    ]
```

## App Example

Check the `example` folder **[here](https://github.com/oiche/react-wizy)** to find a complete implementation of Wizy functionalities