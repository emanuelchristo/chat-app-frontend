import styles from './ViewMode.module.css'

export const ViewMode = ({
	viewMode,
	onViewModeChange,
}: {
	viewMode: 'spacious' | 'compact'
	onViewModeChange: (val: 'spacious' | 'compact') => void
}) => {
	return (
		<div className={styles['view-mode']}>
			<button
				className={`${viewMode === 'spacious' ? styles['selected'] : ''}`}
				onClick={() => onViewModeChange('spacious')}
			>
				Spacious
			</button>
			<button
				className={`${viewMode === 'compact' ? styles['selected'] : ''}`}
				onClick={() => onViewModeChange('compact')}
			>
				Compact
			</button>
		</div>
	)
}
