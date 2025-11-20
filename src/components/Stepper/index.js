'use client'

import React from 'react'
import { Button, Divider, Tooltip } from '@heroui/react'
import { FaCheck } from 'react-icons/fa'

const DEFAULT_LOCALE = {
    entityName: 'job',
    previousButtonText: 'Back',
    previousButtonTooltip: 'Go back to the previous step',
    previousButtonDisabledTooltip: 'Already at the first step',
    nextButtonText: 'Next',
    nextButtonTooltip: 'Go to the next step',
    nextButtonDisabledTooltip: 'Complete this step first',
    completeButtonText: 'Create Job',
    completeButtonTooltip: 'Create this job',
    completeButtonDisabledTooltip: 'Complete this step first',
    stepXOfYTemplate: 'Step {currentStep} of {totalSteps}',
}

/**
 * Hook จัดการ state ของ stepper
 * steps: [{ id, title, description?, content }]
 */
export const useStepper = (steps, options = {}) => {
    const {
        canProceed: canProceedOverride,
        onStepChange: onStepChangeOverride,
        onComplete: onCompleteOverride,
        initialStep = 0,
    } = options

    const [currentStep, setCurrentStep] = React.useState(initialStep)
    const [hasCompleted, setHasCompleted] = React.useState({})
    const [latestCompletedStep, setLatestCompletedStep] = React.useState(null)

    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === steps.length - 1
    const isCurrentStepNext =
        latestCompletedStep !== null && currentStep === latestCompletedStep + 1

    const canGoNext = currentStep < steps.length - 1
    const currentStepData = steps[currentStep]

    const onStepChange = React.useCallback(
        stepIndex => {
            if (stepIndex >= 0 && stepIndex < steps.length) {
                setCurrentStep(stepIndex)
                onStepChangeOverride?.(stepIndex)
            }
        },
        [steps.length, onStepChangeOverride]
    )

    // ถ้าไม่ได้ส่ง canProceed เข้ามา จะถือว่าผ่านได้ทุก step
    const canProceedCurrentStep = React.useMemo(() => {
        return canProceedOverride?.(currentStep) ?? true
    }, [currentStep, canProceedOverride])

    const updateLatestCompletedStep = React.useCallback(stepIndex => {
        setLatestCompletedStep(prev => {
            if (stepIndex >= (prev ?? 0)) return stepIndex
            return prev
        })
    }, [])

    const onNext = React.useCallback(() => {
        if (canGoNext && canProceedCurrentStep) {
            setHasCompleted(prev => ({ ...prev, [currentStep]: true }))
            updateLatestCompletedStep(currentStep)
            onStepChange(currentStep + 1)
        }
    }, [
        canGoNext,
        canProceedCurrentStep,
        currentStep,
        onStepChange,
        updateLatestCompletedStep,
    ])

    const onPrevious = React.useCallback(() => {
        if (currentStep > 0) {
            onStepChange(currentStep - 1)
        }
    }, [currentStep, onStepChange])

    const onComplete = React.useCallback(() => {
        setHasCompleted(prev => ({ ...prev, [currentStep]: true }))
        updateLatestCompletedStep(currentStep)
        onCompleteOverride?.()
    }, [currentStep, onCompleteOverride, updateLatestCompletedStep])

    return {
        steps,
        currentStep,
        hasCompleted,
        latestCompletedStep,
        isFirstStep,
        isLastStep,
        isCurrentStepNext,
        canProceedCurrentStep,
        currentStepData,
        onNext,
        onPrevious,
        onComplete,
        onStepChange,
    }
}

/**
 * Stepper หลัก
 * ใช้ร่วมกับ useStepper ด้านบน
 */
const Stepper = ({
    steps,
    currentStep,
    hasCompleted,
    latestCompletedStep,
    isFirstStep,
    isLastStep,
    isCurrentStepNext,
    canProceedCurrentStep,
    currentStepData,
    onNext,
    onPrevious,
    onComplete,
    onStepChange,
    locale: localeOverride,
    showStepNumbers = true,
    className = '',
    draftNumber = null,
    title = true
}) => {
    const [locale] = React.useState(() => ({
        ...DEFAULT_LOCALE,
        ...localeOverride,
    }))

    const nodeHorizontalOffset = 100 / steps.length / 2
    const singleLineWidthPercent =
        steps.length > 1
            ? (100 - nodeHorizontalOffset * 2) / (steps.length - 1)
            : 100
    const fullLineStart = nodeHorizontalOffset
    const fullLineWidth =
        steps.length > 1
            ? ((latestCompletedStep ?? 0) / (steps.length - 1)) *
            (100 - singleLineWidthPercent)
            : 0
    const dashedLineStart = fullLineStart + fullLineWidth

    return (
        <div className={`mx-auto w-full max-w-4xl ${className}`}>
            {/* Draft Number Display */}
            {draftNumber && (
                <div className="mb-4 flex justify-end">
                    <div className="rounded-lg bg-warning-50 px-4 py-2 border border-warning-200">
                        <span className="text-sm font-semibold text-warning-700">
                            Draft: {draftNumber}
                        </span>
                    </div>
                </div>
            )}

            {/* Step indicator */}
            <div className="mb-8">
                <div className="relative flex items-start justify-between">
                    {/* background line */}
                    {steps.length > 1 && (
                        <div
                            className="absolute top-4 h-0.5 bg-default-200"
                            style={{
                                left: `calc(${nodeHorizontalOffset}%)`,
                                right: `calc(${nodeHorizontalOffset}%)`,
                            }}
                        />
                    )}

                    {/* solid progress line (→ primary) */}
                    {steps.length > 1 && (
                        <div
                            className="bg-primary absolute top-4 h-0.5 transition-all duration-300"
                            style={{
                                left: `calc(${fullLineStart}%)`,
                                width: `calc(${fullLineWidth}%)`,
                            }}
                        />
                    )}

                    {/* dashed active line (primary) */}
                    {steps.length > 1 && isCurrentStepNext && (
                        <div
                            className="absolute top-4 h-0.5 transition-all duration-300"
                            style={{
                                left: `calc(${dashedLineStart}%)`,
                                width: `calc(${singleLineWidthPercent}%)`,
                                backgroundImage:
                                    'repeating-linear-gradient(to right, hsl(var(--heroui-primary) / 1) 0, hsl(var(--heroui-primary) / 1) 4px, transparent 4px, transparent 8px)',
                            }}
                        />
                    )}

                    {steps.map((step, index) => {
                        const isCompleted = hasCompleted[index]
                        const isCurrent = index === currentStep
                        const hasCompletedOrIsCurrent = isCompleted || isCurrent

                        return (
                            <div
                                key={step.id}
                                className="relative z-10 flex flex-1 flex-col items-center"
                            >
                                <Button
                                    onPress={() => onStepChange(index)}
                                    variant="bordered"
                                    color="primary"
                                    radius="full"
                                    size="sm"
                                    isIconOnly
                                    className={[
                                        'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 text-sm font-medium transition-all duration-200',
                                        isCurrent ? 'scale-150' : '',
                                        isCompleted
                                            ? 'bg-primary border-primary hover:bg-primary/90 text-white'
                                            : isCurrent
                                                ? 'border-primary text-primary bg-white shadow-lg hover:shadow-xl'
                                                : 'border-default-300 bg-white text-default-400 hover:border-default-400 hover:text-default-500',
                                    ].join(' ')}
                                >
                                    {isCompleted ? (
                                        <FaCheck size={12} />
                                    ) : showStepNumbers ? (
                                        index + 1
                                    ) : (
                                        <div className="h-2 w-2 rounded-full bg-current" />
                                    )}
                                </Button>

                                <div className="mt-3 max-w-[140px] text-center">
                                    <p
                                        className={[
                                            'text-sm leading-tight font-medium',
                                            hasCompletedOrIsCurrent
                                                ? 'text-foreground'
                                                : 'text-default-400',
                                        ].join(' ')}
                                    >
                                        {step.title}
                                    </p>
                                    {step.description && (
                                        <p
                                            className={[
                                                'mt-1 text-xs leading-tight',
                                                hasCompletedOrIsCurrent
                                                    ? 'text-default-500'
                                                    : 'text-default-300',
                                            ].join(' ')}
                                        >
                                            {step.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Divider className="my-4" />

            {/* Step content */}
            <div className="min-h-[320px] p-1 md:p-2">
                {title && (
                    <div className="mb-4">
                        <h2 className="text-lg md:text-xl font-semibold text-foreground">
                            {currentStepData?.title}
                        </h2>
                        {currentStepData?.description && (
                            <p className="mt-1 text-sm text-default-500">
                                {currentStepData.description}
                            </p>
                        )}
                    </div>
                )}

                <div className="flex-1">{currentStepData?.content}</div>
            </div>

            {/* Navigation */}
            <div className="mt-4 flex items-center justify-between">
                <Tooltip
                    content={
                        isFirstStep
                            ? locale.previousButtonDisabledTooltip
                            : locale.previousButtonTooltip
                    }
                >
                    <div>
                        <Button onPress={onPrevious} isDisabled={isFirstStep}>
                            {locale.previousButtonText}
                        </Button>
                    </div>
                </Tooltip>

                <div className="text-xs md:text-sm text-default-500">
                    {locale.stepXOfYTemplate
                        ?.replace('{currentStep}', String(currentStep + 1))
                        .replace('{totalSteps}', String(steps.length))}
                </div>

                <Tooltip
                    content={
                        isLastStep
                            ? canProceedCurrentStep
                                ? locale.completeButtonTooltip?.replace(
                                    '{entityName}',
                                    locale.entityName ?? 'job'
                                )
                                : locale.completeButtonDisabledTooltip?.replace(
                                    '{entityName}',
                                    locale.entityName ?? 'job'
                                )
                            : canProceedCurrentStep
                                ? locale.nextButtonTooltip
                                : locale.nextButtonDisabledTooltip
                    }
                >
                    <div>
                        <Button
                            onPress={isLastStep ? onComplete : onNext}
                            color="primary"
                            isDisabled={!canProceedCurrentStep}
                        >
                            {isLastStep
                                ? locale.completeButtonText
                                : locale.nextButtonText}
                        </Button>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

export default Stepper