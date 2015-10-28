# configuration settings to be used with server_activity.py 
# Modify as required.
# Not a beebotte user? register now on http://beebotte.com/register
_accesskey    = ''
_secretkey    = ''
 
_period       = 300 # send resource records every 5 minutes
 
# The network interface to report
_ifname = 'eth0'
 
# The disk mount points to report
_mount = '/'

# ADC lines to acquire
_system_AIN_file = '/sys/bus/iio/devices/iio:device0/in_voltage7_raw' 
_bus_AIN_file = '/sys/bus/iio/devices/iio:device0/in_voltage1_raw'

# ECL sectors to monitor
_sector = ['7f', '8f', '9b', '10b']
