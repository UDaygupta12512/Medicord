'use client';

import { useState, useEffect } from 'react';
import { Plus, Bell, Clock, Pill, Calendar, Clock3, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

type Frequency = {
  timesPerDay: number;
  times: string[];
};

type Reminder = {
  _id: string;
  medicineName: string;
  dosage: string;
  frequency: Frequency;
  startDate: string;
  endDate?: string;
  daysOfWeek: number[];
  isActive: boolean;
  notes?: string;
};

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch('/api/reminders');
        if (!response.ok) {
          throw new Error('Failed to fetch reminders');
        }
        const data = await response.json();
        setReminders(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  const toggleReminderStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/reminders/${id}/toggle`, {
        method: 'PATCH',
      });
      
      if (!response.ok) {
        throw new Error('Failed to update reminder status');
      }
      
      setReminders(prevReminders => 
        prevReminders.map(reminder => 
          reminder._id === id 
            ? { ...reminder, isActive: !currentStatus } 
            : reminder
        )
      );
    } catch (err) {
      console.error('Error toggling reminder status:', err);
    }
  };

  const deleteReminder = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reminder?')) return;
    
    try {
      const response = await fetch(`/api/reminders/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete reminder');
      }
      
      setReminders(prevReminders => 
        prevReminders.filter(reminder => reminder._id !== id)
      );
    } catch (err) {
      console.error('Error deleting reminder:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDayName = (dayIndex: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[dayIndex];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Medication Reminders</h1>
        <Link 
          href="/reminders/new"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Reminder
        </Link>
      </div>

      {reminders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No reminders yet</h2>
          <p className="text-gray-500 mb-4">Add your first medication reminder to get started</p>
          <Link 
            href="/reminders/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Reminder
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div key={reminder._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <Pill className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-xl font-semibold text-gray-800">{reminder.medicineName}</h3>
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {reminder.dosage}
                      </span>
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Starts: {formatDate(reminder.startDate)}</span>
                      {reminder.endDate && (
                        <span className="ml-2">• Ends: {formatDate(reminder.endDate)}</span>
                      )}
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <Clock3 className="w-4 h-4 mr-1" />
                      <span>
                        {reminder.frequency.timesPerDay} time{reminder.frequency.timesPerDay > 1 ? 's' : ''} per day • 
                        {reminder.frequency.times.join(', ')}
                      </span>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap gap-1">
                      {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                        <span 
                          key={day}
                          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                            reminder.daysOfWeek.includes(day) 
                              ? 'bg-blue-100 text-blue-800 font-medium' 
                              : 'text-gray-400'
                          }`}
                        >
                          {getDayName(day)[0]}
                        </span>
                      ))}
                    </div>
                    
                    {reminder.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
                        {reminder.notes}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => toggleReminderStatus(reminder._id, reminder.isActive)}
                      className={`p-2 rounded-full ${
                        reminder.isActive 
                          ? 'text-green-600 hover:bg-green-50' 
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                      title={reminder.isActive ? 'Active' : 'Inactive'}
                    >
                      {reminder.isActive ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <XCircle className="w-5 h-5" />
                      )}
                    </button>
                    
                    <Link 
                      href={`/reminders/${reminder._id}/edit`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                    
                    <button
                      onClick={() => deleteReminder(reminder._id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
