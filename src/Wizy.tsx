import React from 'react';

type Step = {
    name: string
    component: JSX.Element
    last?: boolean
    previous?: (() => string | number) | string | number
    next?: (() => string | number) | string | number
}

interface IProps {
    flow: Step[]
    startAtStep?: number | string
    onPreviousStepChanging?: (step: Step) => boolean | void
    onPreviousStepChanged?: (step: Step) => void
    onNextStepChanging?: (step: Step) => boolean | void
    onNextStepChanged?: (step: Step) => void
}

interface IState {
    currentStepIndex: number
}

export default class Wizy extends React.Component<IProps, IState> {

    private static DEFAULT_STEP_INDEX: number = 0

    constructor(props: IProps) {
        super(props)
        const { startAtStep } = props
        this.state = {
            currentStepIndex: this.getStepIndex(startAtStep)
        }
    }

    private getStepIndex(step?: Number | String): number {
        const { flow } = this.props
        if (typeof step === 'string') {
            const index = flow.findIndex((s) => s.name === step)
            if (index > 0) { 
                return index
            }
        } else if (typeof step === 'number') {
            if (step >= 0 && step < flow.length) {
                return step
            }
        }
        return Wizy.DEFAULT_STEP_INDEX
    }

    previous(): void {
        const { flow, onPreviousStepChanging, onPreviousStepChanged } = this.props
        const { currentStepIndex } = this.state
        const currentStep = flow[currentStepIndex]
        const previous = currentStep.previous
        
        const stop = onPreviousStepChanging?.call(this, currentStep)

        if (stop) { 
            return
        }

        let previousStepIndex = currentStepIndex - 1

        if (typeof previous === 'number' || typeof previous === 'string') {
            previousStepIndex = this.getStepIndex(previous)
        } else if (typeof previous === 'function') {
            const result = previous.call(this)
            if (typeof result === 'string') {
                previousStepIndex = this.getStepIndex(result)
            } else if (typeof result === 'number') {
                previousStepIndex = result
            }
        }

        if (previousStepIndex >= 0) {
            const previousStep = flow[previousStepIndex]
            onPreviousStepChanged?.call(this, previousStep)
            this.setState({
                currentStepIndex: previousStepIndex
            })
        }
    }

    next(): void {
        const { flow, onNextStepChanging, onNextStepChanged } = this.props
        const { currentStepIndex } = this.state
        const currentStep = flow[currentStepIndex]
        const next = currentStep.next

        const stop = onNextStepChanging?.call(this, currentStep)

        if (stop || currentStep.last) {
            return
        }

        let nextStepIndex = currentStepIndex + 1

        if (typeof next === 'number' || typeof next === 'string') {
            nextStepIndex = this.getStepIndex(next)
        } else if (typeof next === 'function') {
            const result = next.call(this)
            if (typeof result === 'string') {
                nextStepIndex = this.getStepIndex(result)
            } else if (typeof result === 'number') {
                nextStepIndex = result
            }
        }

        if (nextStepIndex < flow.length) {
            const nextStep = flow[nextStepIndex]
            onNextStepChanged?.call(this, nextStep)
            this.setState({
                currentStepIndex: nextStepIndex
            })
        }
    }

    render() {
        const { flow } = this.props
        const { currentStepIndex} = this.state
        const step = flow[currentStepIndex]
        return step.component
    }
}