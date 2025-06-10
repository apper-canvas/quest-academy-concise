import React, { useState } from 'react';
import PageHeader from '@/components/molecules/PageHeader';
import SettingsCategory from '@/components/organisms/SettingsCategory';
import ProfileManagement from '@/components/organisms/ProfileManagement';
import HelpAndSupport from '@/components/organisms/HelpAndSupport';

export default function SettingsPage() {
  const [settings, setSettings] = useState([
    {
      id: 'sound',
      title: 'Sound Effects',
      description: 'Play sounds during lessons and activities',
      icon: 'Volume2',
      enabled: true
    },
    {
      id: 'music',
      title: 'Background Music',
      description: 'Play background music while learning',
      icon: 'Music',
      enabled: false
    },
    {
      id: 'notifications',
      title: 'Learning Reminders',
      description: 'Receive daily reminders to practice',
      icon: 'Bell',
      enabled: true
    },
    {
      id: 'difficulty',
      title: 'Auto-Adjust Difficulty',
      description: 'Automatically adjust lesson difficulty based on performance',
      icon: 'Target',
      enabled: true
    }
  ]);

  const handleToggleSetting = (id) => {
    setSettings((prevSettings) =>
      prevSettings.map((option) =>
        option.id === id ? { ...option, enabled: !option.enabled } : option
      )
    );
  };

  const audioNotificationSettings = settings.filter(option => ['sound', 'music', 'notifications', 'difficulty'].includes(option.id));

  return (
    <div className="min-h-full bg-gradient-to-br from-accent/20 via-white to-primary/10">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PageHeader
          title="Settings"
          description="Customize your learning experience to make it perfect for you!"
          icon="Settings"
          iconBgColor="bg-gradient-to-br from-gray-600 to-gray-800"
          iconAnimation={{ rotate: [0, 10, -10, 0] }}
        />

        <div className="space-y-8">
          <SettingsCategory
            title="Audio & Notifications"
            options={audioNotificationSettings}
            onToggle={handleToggleSetting}
            initialDelay={0.5}
          />

          <ProfileManagement initialDelay={0.7} />

          <HelpAndSupport initialDelay={0.9} />
        </div>
      </div>
    </div>
  );
}