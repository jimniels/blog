#tips

# Changes to max_upload_filesize not working in php.ini? Restart Apache!

I was trying to import a SQL database into a local copy of Wordpress. The SQL file was larger than the standard 2MB upload limit, so Wordpress wouldn't let me upload it.

After some research, I realized I could change the `max_upload_filesize` in the `php.ini` file. However, after changing the value to 10MB, Wordpress was still indicating the prior upload limit of 2MB. After wasting time trying other fixes, I suddenly realized I had not restarted apache!

![Duh!](https://cdn.jim-nielsen.com/blog/2013/duh.gif)

From the command line `sudo apachectl restart` restarted my local apache server and changed my upload limit to 10MB in Wordpress.

**Lesson**: if you're tinkering in configuration files, don't forget to restart apache to see your changes!
