import { useState } from 'react'
import { useConvexMutation } from '@convex-dev/react-query'
import { api } from '@packages/convex/api'
import { useMutation } from '@tanstack/react-query'
import styles from './add-task.module.css'
import type { SubmitEventHandler } from 'react'
import { Button } from '@/components/button/button'
import { Input } from '@/components/input/input'
import { getTestId } from '@/utils/test-ids'

type Props = {
  'data-testid'?: string
}

export const AddTask = ({ 'data-testid': dataTestId }: Props) => {
  const [text, setText] = useState('')

  const addTask = useMutation({
    mutationFn: useConvexMutation(api.tasks.add),
  })

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    addTask.mutateAsync({ text: text.trim() }).then(() => setText(''))
  }

  // MARK: Renderers

  return (
    <form
      className={styles.root}
      onSubmit={handleSubmit}
      {...getTestId([dataTestId, 'root'])}
    >
      <div className={styles.inputWrapper}>
        <Input
          inputProps={{
            type: 'text',
            value: text,
            onChange: (e) => setText(e.target.value),
            placeholder: 'Add a task...',
            disabled: addTask.isPending,
          }}
          {...getTestId([dataTestId, 'input'])}
        />
      </div>

      <Button
        className={styles.submitButton}
        type="submit"
        disabled={addTask.isPending || !text.trim()}
        isLoading={addTask.isPending}
        {...getTestId([dataTestId, 'submit'])}
      >
        Add
      </Button>
    </form>
  )
}
