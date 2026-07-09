import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('tasks').collect()
  },
})

export const add = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('tasks', { text: args.text, isCompleted: false })
  },
})

export const toggle = mutation({
  args: { taskId: v.id('tasks') },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.taskId)
    if (!task) throw new Error('Task not found')
    await ctx.db.patch(args.taskId, { isCompleted: !task.isCompleted })
  },
})

export const remove = mutation({
  args: { taskId: v.id('tasks') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.taskId)
  },
})
