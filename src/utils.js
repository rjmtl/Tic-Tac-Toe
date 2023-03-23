export const AUTH_TOKEN = "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";

export const SORT_ORDER_OPTIONS = [
    { label: "Descending", value: "desc" },
    { label: "Ascending", value: "asc" },
]

export const SORT_BY_OPTIONS = [
    { label: "Relevance", value: "text-match" },
    { label: "Stars", value: "stars" },
    { label: "Forks", value: "forks" },
    { label: "Help Wanted Issues", value: "help-wanted-issues" },
    { label: "Recently Updated", value: "updated" },
]

export function truncate(str, n=25){
    return (str?.length > n) ? str.slice(0, n-1) + '...' : str;
  };