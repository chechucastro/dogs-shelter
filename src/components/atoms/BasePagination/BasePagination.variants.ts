import { tv } from 'tailwind-variants'
import { ALIGNMENT_VARIANTS } from './BasePagination.const'

export const paginationVariants = tv({
  base: 'base-pagination flex mt-6 [&_.el-pager_li]:mx-1 [&_.btn-prev]:mx-1 [&_.btn-next]:mx-1',
  variants: {
    alignment: {
      [ALIGNMENT_VARIANTS.left]: 'justify-start',
      [ALIGNMENT_VARIANTS.center]: 'justify-center',
      [ALIGNMENT_VARIANTS.right]: 'justify-end',
    },
  },
  defaultVariants: {
    alignment: ALIGNMENT_VARIANTS.center,
  },
})

