import { useEffect, useRef } from 'react'
import './AutoSizingTextarea.css'

const AutoSizingTextarea = ({ className, name, value, holderText, titleHint, onValueChange, onTaskFocus, onTaskBlur, onEnterDown }) => {
    const textareaRef = useRef(null)

    const adjustHeight = element => {
        // Reset to 1px first to force reflow
        element.style.height = '1px'

        const computedStyle = getComputedStyle(element)
        const lineHeight = parseFloat(computedStyle.lineHeight)
        const padding = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom)

        // Calculate base height for 1 line
        const baseHeight = lineHeight + padding

        // Get scroll height without padding
        const contentHeight = element.scrollHeight - padding

        // Calculate needed lines (minimum 0 when empty)
        const lineCount = contentHeight > 0 ? Math.ceil(contentHeight / lineHeight) : 0

        // Use maximum between content height and base height
        const newHeight = Math.max(
            lineCount * lineHeight + padding,
            baseHeight
        )

        element.style.height = `${newHeight}px`
        element.style.overflowY = 'hidden' // Force hide scrollbar
    }

    useEffect(() => {
        const handleFontLoad = () => {
            if (textareaRef.current) {
                adjustHeight(textareaRef.current)
            }
        }

        // Wait for fonts to load before first calculation
        document.fonts.ready.then(handleFontLoad)

        // Initial check in case fonts are already loaded
        if (document.fonts.status === 'loaded') {
            handleFontLoad()
        }
    }, [value])

    useEffect(() => {
        if (textareaRef.current && !value) {
            // Force single line when empty
            textareaRef.current.style.height = `${parseFloat(getComputedStyle(textareaRef.current).lineHeight) +
                parseFloat(getComputedStyle(textareaRef.current).paddingTop) +
                parseFloat(getComputedStyle(textareaRef.current).paddingBottom)}px`
        }
    }, [value])

    return (
        <textarea
            ref={textareaRef}
            className={`auto-sizing-textarea ${className}`}
            placeholder={holderText}
            title={titleHint}
            type='text'
            name={name}
            value={value}
            onChange={onValueChange}
            onFocus={onTaskFocus}
            onBlur={onTaskBlur}
            onKeyDown={onEnterDown}
        />
    )
}

export default AutoSizingTextarea