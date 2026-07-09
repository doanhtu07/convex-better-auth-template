import { useConvexMutation } from '@convex-dev/react-query'
import { X } from 'lucide-react'
import { api } from '@packages/convex/api'
import { useMutation } from '@tanstack/react-query'
import styles from './task.module.css'
import type { DataModel } from '@packages/convex/dataModel'
import { Button } from '@/components/button/button'
import { getTestId } from '@/utils/test-ids'

type Props = {
  task: DataModel['tasks']['document']
  'data-testid'?: string
}

export const Task = ({ task, 'data-testid': dataTestId }: Props) => {
  const toggleTask = useMutation({
    mutationFn: useConvexMutation(api.tasks.toggle),
  })

  const removeTask = useMutation({
    mutationFn: useConvexMutation(api.tasks.remove),
  })

  // MARK: Renderers

  return (
    <div className={styles.root} {...getTestId([dataTestId, 'root'])}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => toggleTask.mutate({ taskId: task._id })}
          disabled={toggleTask.isPending}
          {...getTestId([dataTestId, 'checkbox'])}
        />

        <span
          className={task.isCompleted ? styles.completedText : styles.text}
          {...getTestId([dataTestId, 'text'])}
        >
          {task.text}
        </span>
      </label>

      <Button
        className={styles.deleteButton}
        onClick={() => removeTask.mutate({ taskId: task._id })}
        disabled={removeTask.isPending}
        isLoading={removeTask.isPending}
        {...getTestId([dataTestId, 'delete'])}
      >
        <X size={16} />
      </Button>
    </div>
  )
}
