import Badge from '../models/badgeModel.js';
import User from '../models/userModel.js';
import { sendNotification } from './notificationHelper.js';

const awardStreakBadges = async (userId, currentStreak) => {
    try {
        // find all streak badges the user is qualified for based on their new streak
        const qualifiedBadges = await Badge.find({
            criteriaType: 'streak',
            criteriaValue: { $lte: currentStreak }
        });

        const user = await User.findById(userId);
        const newBadges = [];   

        // filter out badges the user already owns
        for (const badge of qualifiedBadges) {
            if (!user.badges.includes(badge._id)) {
            user.badges.push(badge._id);
            newBadges.push(badge);
            }
        }

        // save and notify
        if (newBadges.length > 0) {
            await user.save();
            
            // send a notification for each newly earned badge
            for (const b of newBadges) {
            await sendNotification(
                userId,
                'system_alert',
                'Achievement Unlocked!',
                `You've earned the "${b.badgeName}" badge for your ${currentStreak}-day streak!`
            );
            }
        }
    } catch (error) {
        console.error("Error awarding badges:", error);
    }
};

export {
    awardStreakBadges
}