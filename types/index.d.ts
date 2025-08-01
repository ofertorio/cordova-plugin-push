// Type definitions for phonegap-plugin-push
// Project: https://github.com/havesource/cordova-plugin-push
// Definitions by: Frederico Galvão <https://github.com/fredgalvao>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace PhonegapPluginPush {
	type EventResponse = RegistrationEventResponse | NotificationEventResponse | Error

	interface PushNotification {
		/**
		 * The event registration will be triggered on each successful registration with the 3rd party push service.
		 * @param event
		 * @param callback
		 */
		on(event: "registration", callback: (response: RegistrationEventResponse) => any): void
		/**
		 * The event notification will be triggered each time a push notification is received by a 3rd party push service on the device.
		 * @param event
		 * @param callback
		 */
		on(event: "notification", callback: (response: NotificationEventResponse) => any): void
		/**
		 * The event error will trigger when an internal error occurs and the cache is aborted.
		 * @param event
		 * @param callback
		 */
		on(event: "error", callback: (response: Error) => any): void
		/**
		 *
		 * @param event Name of the event to listen to. See below(above) for all the event names.
		 * @param callback is called when the event is triggered.
		 * @param event
		 * @param callback
		 */
		on(event: string, callback: (response: EventResponse) => any): void

		off(event: "registration", callback: (response: RegistrationEventResponse) => any): void
		off(event: "notification", callback: (response: NotificationEventResponse) => any): void
		off(event: "error", callback: (response: Error) => any): void
		/**
		 * As stated in the example, you will have to store your event handler if you are planning to remove it.
		 * @param event Name of the event type. The possible event names are the same as for the push.on function.
		 * @param callback handle to the function to get removed.
		 * @param event
		 * @param callback
		 */
		off(event: string, callback: (response: EventResponse) => any): void

		/**
		 * The unregister method is used when the application no longer wants to receive push notifications.
		 * Beware that this cleans up all event handlers previously registered,
		 * so you will need to re-register them if you want them to function again without an application reload.
		 * @param successHandler
		 * @param errorHandler
		 * @param topics
		 */
		unregister(successHandler: () => any, errorHandler?: () => any, topics?: string[]): void

		/**
		 * The subscribe method is used when the application wants to subscribe a new topic to receive push notifications.
		 * @param topic Topic to subscribe to.
		 * @param successHandler Is called when the api successfully unregisters.
		 * @param errorHandler Is called when the api encounters an error while unregistering.
		 */
		subscribe(topic: string, successHandler: () => any, errorHandler: () => any): void;

		/**
		 * The unsubscribe method is used when the application no longer wants to receive push notifications
		 * from a specific topic but continue to receive other push messages.
		 * @param topic Topic to unsubscribe from.
		 * @param successHandler Is called when the api successfully unregisters.
		 * @param errorHandler Is called when the api encounters an error while unregistering.
		 */
		unsubscribe(topic: string, successHandler: () => any, errorHandler: () => any): void;

		/*TODO according to js source code, "errorHandler" is optional, but is "count" also optional? I can't read objetive-C code (can anyone at all? I wonder...)*/
		/**
		 * Set the badge count visible when the app is not running
		 *
		 * The count is an integer indicating what number should show up in the badge.
		 * Passing 0 will clear the badge.
		 * Each notification event contains a data.count value which can be used to set the badge to correct number.
		 * @param successHandler
		 * @param errorHandler
		 * @param count
		 */
		setApplicationIconBadgeNumber(successHandler: () => any, errorHandler: () => any, count: number): void

		/**
		 * Get the current badge count visible when the app is not running
		 * successHandler gets called with an integer which is the current badge count
		 * @param successHandler
		 * @param errorHandler
		 */
		getApplicationIconBadgeNumber(successHandler: (count: number) => any, errorHandler: () => any): void

		/**
		 * iOS only
		 * Tells the OS that you are done processing a background push notification.
		 * successHandler gets called when background push processing is successfully completed.
		 * @param successHandler
		 * @param errorHandler
		 * @param id
		 */
		finish(successHandler?: () => any, errorHandler?: () => any, id?: string): void

		/**
		 * Tells the OS to clear all notifications from the Notification Center
		 * @param successHandler Is called when the api successfully clears the notifications.
		 * @param errorHandler Is called when the api encounters an error when attempting to clear the notifications.
		 */
		clearAllNotifications(successHandler: () => any, errorHandler: () => any): void

		/**
		 * Tells the OS to clear the notification that corresponds to the id argument, from the Notification Center
		 * @param successHandler Is called when the api successfully clears the notification.
		 * @param errorHandler Is called when the api encounters an error when attempting to clear the notification.
		 * @param id The ID of the notification that will be cleared.
		 */
		clearNotification(successHandler: () => any, errorHandler: () => any, id?: number): void
	}

	/**
	 * platform specific initialization options.
	 */
	interface InitOptions {
		/**
		 * Android specific initialization options.
		 */
		android?: {
			/**
			 * The name of a drawable resource to use as the small-icon. The name should not include the extension.
			 */
			icon?: string
			/**
			 * Sets the background color of the small icon on Android 5.0 and greater.
			 * Supported Formats - http://developer.android.com/reference/android/graphics/Color.html#parseColor(java.lang.String)
			 */
			iconColor?: string
			/**
			 * If true it plays the sound specified in the push data or the default system sound. Default is true.
			 */
			sound?: boolean
			/**
			 * If true the device vibrates on receipt of notification. Default is true.
			 */
			vibrate?: boolean
			/**
			 * If true the icon badge will be cleared on init and before push messages are processed. Default is false.
			 */
			clearBadge?: boolean
			/**
			 * If true the app clears all pending notifications when it is closed. Default is true.
			 */
			clearNotifications?: boolean
			/**
			 * If true will always show a notification, even when the app is on the foreground. Default is false.
			 */
			forceShow?: boolean
			/**
			 * If the array contains one or more strings each string will be used to subscribe to a GcmPubSub topic.
			 */
			topics?: string[]
			/**
			 * The key to search for text of notification. Default is 'message'.
			 */
			messageKey?: string
			/**
			 * The key to search for title of notification. Default is 'title'.
			 */
			titleKey?: string
		}

		/**
		 * Browser specific initialization options.
		 */
		browser?: {
			/**
			 * URL for the push server you want to use. Default is 'http://push.api.phonegap.com/v1/push'.
			 */
			pushServiceURL?: string
			/**
			 * Your GCM API key if you are using VAPID keys.
			 */
			applicationServerKey?: string
		}

		/**
		 * iOS specific initialization options.
		 */
		ios?: {
			/**
			 * If true|"true" the device will be set up to receive VoIP Push notifications and the other options will be ignored
			 * since VoIP notifications are silent notifications that should be handled in the "notification" event.
			 * Default is false|"false".
			 */
			voip?: boolean | string
			/**
			 * If true|"true" the device sets the badge number on receipt of notification.
			 * Default is false|"false".
			 * Note: the value you set this option to the first time you call the init method will be how the application always acts.
			 * Once this is set programmatically in the init method it can only be changed manually by the user in Settings>Notifications>App Name.
			 * This is normal iOS behaviour.
			 */
			badge?: boolean | string
			/**
			 * If true|"true" the device plays a sound on receipt of notification.
			 * Default is false|"false".
			 * Note: the value you set this option to the first time you call the init method will be how the application always acts.
			 * Once this is set programmatically in the init method it can only be changed manually by the user in Settings>Notifications>App Name.
			 * This is normal iOS behaviour.
			 */
			sound?: boolean | string
			/**
			 * If true|"true" the device shows an alert on receipt of notification.
			 * Default is false|"false".
			 * Note: the value you set this option to the first time you call the init method will be how the application always acts.
			 * Once this is set programmatically in the init method it can only be changed manually by the user in Settings>Notifications>App Name.
			 * This is normal iOS behaviour.
			 */
			alert?: boolean | string
			/**
			 * If true|"true" the badge will be cleared on app startup. Defaults to false|"false".
			 */
			clearBadge?: boolean | string
			/**
			 * The data required in order to enable Action Buttons for iOS.
			 * Action Buttons on iOS - https://github.com/havesource/cordova-plugin-push/blob/master/docs/PAYLOAD.md#action-buttons-1
			 */
			categories?: CategoryArray
			/**
			 * If `true` the device can show up critical alerts. (Possible since iOS 12 with a special entitlement)
			 * Default is false|"false".
       * Note: the value you set this option to the first time you call the init method will be how the application always acts.
       * Once this is set programmatically in the init method it can only be changed manually by the user in Settings > Notifications > `App Name`.
       * This is normal iOS behaviour.
			 */
			critical?: boolean
			/**
			 * If the array contains one or more strings each string will be used to subscribe to a FcmPubSub topic. Defaults to [].
			 */
			topics?: string[],
			/**
			 * If true will always show a notification, even when the app is on the foreground. Default is false.
			 */
			forceShow?: boolean
      /**
			 * If true the app will register for remote notifications, even if the user has denied notification permissions.
			 * On iOS, notification permissions only control user-facing notifications – background pushes can still be received.
			 * Default is false.
			 */
			forceRegister?: boolean
		}
	}

	interface CategoryArray {
		[name: string]: CategoryAction
	}

	interface CategoryAction {
		yes?: CategoryActionData
		no?: CategoryActionData
		maybe?: CategoryActionData
	}

	interface CategoryActionData {
		/**
		 * The javascript event you want to fire.
		 */
		callback: string
		/**
		 * The label for the button.
		 */
		title: string
		/**
		 * Whether or not to bring your app to the foreground
		 */
		foreground: boolean
		/**
		 * Colors the button red as a warning to the user that the action may be destructive.
		 */
		destructive: boolean
	}

	interface RegistrationEventResponse {
		/**
		 * The registration ID provided by the 3rd party remote push service.
		 */
		registrationId: string
	}

	interface NotificationEventResponse {
		/**
		 * The text of the push message sent from the 3rd party service.
		 */
		message: string
		/**
		 * The optional title of the push message sent from the 3rd party service.
		 */
		title?: string
		/**
		 * The number of messages to be displayed in the badge iOS or message count in the notification shade in Android.
		 */
		count: string
		/**
		 * The name of the sound file to be played upon receipt of the notification.
		 */
		sound: string
		/**
		 * The path of the image file to be displayed in the notification.
		 */
		image: string
		/**
		 * An optional collection of data sent by the 3rd party push service that does not fit in the above properties.
		 */
		additionalData: NotificationEventAdditionalData
	}

	/**
	 * TODO: document all possible properties (I only got the android ones)
	 *
	 * Loosened up with a dictionary notation, but all non-defined properties need to use (map['prop']) notation
	 *
	 * Ideally the developer would overload (merged declaration) this or create a new interface that would extend this one
	 * so that he could specify any custom code without having to use array notation (map['prop']) for all of them.
	 */
	interface NotificationEventAdditionalData {
		[name: string]: any

		/**
		 * Whether the notification was received while the app was in the foreground.
		 */
		foreground?: boolean
		/**
		 * Will be true if the application is started by clicking on the push notification, false if the app is already started. (Android/iOS only)
		 */
		coldstart?: boolean
		collapse_key?: string
		from?: string
		notId?: string
	}

	interface Channel {
		/**
		 * The id of the channel. Must be unique per package. The value may be truncated if it is too long.
		 */
		id: string;
		/**
		 * The user visible name of the channel. The recommended maximum length is 40 characters; the value may be truncated if it is too long.
		 */
		description: string;
		/**
		 * The importance of the channel. This controls how interruptive notifications posted to this channel are. The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
		 */
		importance: number;
		/**
		 * The name of the sound file to be played upon receipt of the notification in this channel. Empty string to disable sound. Cannot be changed after channel is created.
		 */
		sound?: string;
		/**
		 * Boolean sets whether notification posted to this channel should vibrate. Array sets custom vibration pattern. Example - vibration: [2000, 1000, 500, 500]. Cannot be changed after channel is created.
		 */
		vibration?: boolean|number[];
		/**
		 * Sets whether notifications posted to this channel appear on the lockscreen or not, and if so, whether they appear in a redacted form. 0 = Private, 1 = Public, -1 = Secret.
		 */
		visibility?: number;
	}

	interface PushNotificationStatic {
		new (options: InitOptions): PushNotification
		/**
		 * Initializes the plugin on the native side.
		 * @param options An object describing relevant specific options for all target platforms.
		 */
		init(options: InitOptions): PushNotification
		/**
		 * Checks whether the push notification permission has been granted.
		 * @param successCallback Is called when the api successfully retrieves the details on the permission.
		 * @param errorCallback	Is called when the api fails to retrieve the details on the permission.
		 */
		hasPermission(successCallback: (data: {isEnabled: boolean}) => void, errorCallback: () => void): void;
		/**
		 * Android only
		 * Create a new notification channel for Android O and above.
		 * @param successCallback Is called when the api successfully creates a channel.
		 * @param errorCallback Is called when the api fails to create a channel.
		 * @param channel The options for the channel.
		 */
		createChannel(successCallback: () => void, errorCallback: () => void, channel: Channel): void;
		/**
		 * Android only
		 * Delete a notification channel for Android O and above.
		 * @param successCallback Is called when the api successfully deletes a channel.
		 * @param errorCallback Is called when the api fails to create a channel.
		 * @param channelId The ID of the channel.
		 */
		deleteChannel(successCallback: () => void, errorCallback: () => void, channelId: string): void;
		/**
		 * Android only
		 * Returns a list of currently configured channels.
		 * @param successCallback Is called when the api successfully retrieves the list of channels.
		 * @param errorCallback Is called when the api fails to retrieve the list of channels.
		 */
		listChannels(successCallback: (channels: Channel[]) => void, errorCallback: () => void): void;
	}
}

interface Window {
	PushNotification: PhonegapPluginPush.PushNotificationStatic
}
declare var PushNotification: PhonegapPluginPush.PushNotificationStatic;
