import zipfile
import os
import time
import sys

args = sys.argv

time.sleep(3)

filetype = 'jpg'

fullpath = os.path.dirname(os.path.realpath(__file__))
fullpath = str(fullpath).replace('\\\\python', '\\\\')
if os.path.exists(fullpath + '/folder.zip'):
    os.remove(fullpath + '/folder.zip')

filename = os.path.basename(args[1])

with zipfile.ZipFile(fullpath + '/folder.zip', 'w') as zip_file:
    zip_file.write(args[1], arcname=filename)

with open(fullpath + '/base/base.' + filetype, 'rb') as image_file, open(fullpath + "/folder.zip", 'rb') as zip_file:
    image_data = image_file.read()
    zip_data = zip_file.read()

output = fullpath.replace('bin\\python', '\\') 
if os.path.exists(fullpath + '/out/image.' + filetype):
    os.remove(fullpath + '/out/image.' + filetype)

with open(output + 'image.' + filetype, 'wb') as new_image_file:
    new_image_file.write(image_data + zip_data)
