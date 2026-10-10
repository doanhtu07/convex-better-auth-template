import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery, useConvex } from '@convex-dev/react-query'
import { api } from '@packages/convex/api'
import styles from './auth-controls.module.css'
import { authClient } from '@/utils/auth/auth-client'
import { Button } from '@/components/button/button'
import { CustomLink } from '@/components/custom-link/custom-link'

export const AuthControls = () => {
  const queryClient = useQueryClient()
  const convex = useConvex()

  const { data: user } = useSuspenseQuery(
    convexQuery(api.auth.getCurrentUser, {}),
  )

  // MARK: Renderer

  if (!user) {
    return (
      <div className={styles.root}>
        <CustomLink to="/signin">Sign In</CustomLink>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <span className={styles.email}>{user.email}</span>

      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                convex.clearAuth()
                queryClient.clear()
                location.reload()
              },
              onError: ({ error }) => {
                console.error('auth-controls - signOut - error:', error)
              },
            },
          })
        }
      >
        Sign Out
      </Button>
    </div>
  )
}
