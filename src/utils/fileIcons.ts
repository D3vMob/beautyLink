interface FileTypeIcon {
    icon: string;
    color: string;
  }

export const FILE_TYPE_ICONS: Record<string, FileTypeIcon> = {
    // Documents
    'pdf': { icon: '󰈦', color: '#e74856' },
    'doc': { icon: '󰈬', color: '#2b579a' },
    'docx': { icon: '󰈬', color: '#2b579a' },
    'xls': { icon: '󰈛', color: '#207245' },
    'xlsx': { icon: '󰈛', color: '#207245' },
    'ppt': { icon: '󰈧', color: '#d24726' },
    'pptx': { icon: '󰈧', color: '#d24726' },
    'txt': { icon: '󰈙', color: '#6c757d' },
    
    // Archives
    'zip': { icon: '󰗄', color: '#e89f1c' },
    'rar': { icon: '󰗄', color: '#e89f1c' },
    '7z': { icon: '󰗄', color: '#e89f1c' },
    'tar': { icon: '󰗄', color: '#e89f1c' },
    'gz': { icon: '󰗄', color: '#e89f1c' },
    
    // Images
    'jpg': { icon: '󰈟', color: '#a855f7' },
    'jpeg': { icon: '󰈟', color: '#a855f7' },
    'png': { icon: '󰈟', color: '#a855f7' },
    'gif': { icon: '󰈟', color: '#a855f7' },
    'svg': { icon: '󰜡', color: '#f97316' },
    'webp': { icon: '󰈟', color: '#a855f7' },
    
    // Videos
    'mp4': { icon: '󰕧', color: '#ec4899' },
    'avi': { icon: '󰕧', color: '#ec4899' },
    'mov': { icon: '󰕧', color: '#ec4899' },
    'mkv': { icon: '󰕧', color: '#ec4899' },
    'webm': { icon: '󰕧', color: '#ec4899' },
    
    // Audio
    'mp3': { icon: '󰈣', color: '#10b981' },
    'wav': { icon: '󰈣', color: '#10b981' },
    'flac': { icon: '󰈣', color: '#10b981' },
    'ogg': { icon: '󰈣', color: '#10b981' },
    
    // Code
    'js': { icon: '󰌞', color: '#f0db4f' },
    'ts': { icon: '󰛦', color: '#3178c6' },
    'jsx': { icon: '󰜈', color: '#61dafb' },
    'tsx': { icon: '󰜈', color: '#61dafb' },
    'py': { icon: '󰌠', color: '#3776ab' },
    'java': { icon: '󰬷', color: '#007396' },
    'php': { icon: '󰌟', color: '#777bb4' },
    'rb': { icon: '󰴭', color: '#cc342d' },
    'go': { icon: '󰟓', color: '#00add8' },
    'rs': { icon: '󱘗', color: '#dea584' },
    'html': { icon: '󰌝', color: '#e34c26' },
    'css': { icon: '󰌜', color: '#264de4' },
    'json': { icon: '󰘦', color: '#f7df1e' },
    'xml': { icon: '󰗀', color: '#ff6600' },
    'yaml': { icon: '󰈙', color: '#cb171e' },
    'yml': { icon: '󰈙', color: '#cb171e' },
    'md': { icon: '󰍔', color: '#083fa1' },
    'sql': { icon: '󰆼', color: '#00758f' },
    'sh': { icon: '󰆍', color: '#89e051' },
  };