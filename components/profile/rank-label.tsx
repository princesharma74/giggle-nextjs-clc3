export function getBadge(platform: string, rating: number): string {
    if (platform === 'Codeforces') {
        if (rating < 1200) {
            return 'Newbie';
        } else if (rating < 1400) {
            return 'Pupil';
        } else if (rating < 1600) {
            return 'Specialist';
        } else if (rating < 1900) {
            return 'Expert';
        } else if (rating < 2100) {
            return 'Candidate Master';
        } else if (rating < 2300) {
            return 'Master';
        } else if (rating < 2400) {
            return 'International Master';
        } else if (rating < 2600) {
            return 'Grandmaster';
        } else if (rating < 3000) {
            return 'International Grandmaster';
        } else {
            return 'Legendary Grandmaster';
        }
    } else if (platform === 'Leetcode') {
        if (rating >= 2155) {
            return 'Guardian';
        } else if (rating >= 1855) {
            return 'Knight';
        } else {
            return 'N/A';
        }
    } else if (platform === 'Codechef') {
        if (rating < 1400) {
            return "★"; // One star
        } else if (rating < 1600) {
            return "★★"; // Two stars
        } else if (rating < 1800) {
            return '★★★'; // Three stars
        } else if (rating < 2000) {
            return '★★★★'; // Four stars
        } else if (rating < 2200) {
            return '★★★★★'; // Five stars
        } else if (rating < 2500) {
            return '★★★★★★'; // Six stars
        } else {
            return '★★★★★★★'; // Seven stars
        }
    }
    else{
        return 'Null'
    }
}