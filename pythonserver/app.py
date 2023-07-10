from flask import Flask, request, jsonify
import urllib.request
import face_recognition as fr
import os
import cv2
import face_recognition
import numpy as np
from time import sleep
app = Flask(__name__)
# name = "unknown"
test=""
@app.route('/api2', methods=['GET','POST'])
def my_endpoint():
    variable1 = request.json['cimage_url']
    
    req = urllib.request.build_opener()
    req.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64)')]
    urllib.request.install_opener(req)
    file_path='training_images/'
    filename= variable1.split("/")[-1]
    fullpath = '{}{}'.format(file_path, filename)
    urllib.request.urlretrieve(variable1, fullpath)
    print(variable1)
    response = {'message': 'Variable received and processed', 'data': variable1}
    return jsonify(response)
  
@app.route('/api2/testimage', methods=['GET','POST'])
def my_testpoint():
    
    variable2 = request.json['image_url']
    print(variable2)
    req = urllib.request.build_opener()
    req.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64)')]
    urllib.request.install_opener(req)
    # file_path='/'
    filename= variable2.split("/")[-1]
    # fullpath = '{}{}'.format(file_path, filename)
    urllib.request.urlretrieve(variable2, filename)
    # print(variable1)
    
    print(filename)
    result=classify_face(filename)
    response = {'message': 'Variable received and processed', 'caseid': result[0],'file':filename}
    
    return response
    
def get_encoded_faces():
    encoded = {}
    for dirpath, dnames, fnames in os.walk("./training_images"):
        for f in fnames:
            
            if f.endswith(".jpg") or f.endswith("png"):
                face = fr.load_image_file("training_images/"+f)
                encoding = fr.face_encodings(face)[0]
                encoded[f.split(".")[0]] = encoding
                print(f)
    return encoded
def unknown_image_encoded(img):
    face = fr.load_image_file("training_images/" + img)
    encoding = fr.face_encodings(face)[0]
    return encoding
def classify_face(im):
    faces = get_encoded_faces()
    faces_encoded = list(faces.values())
    known_face_names = list(faces.keys())
    img = cv2.imread(im, 1)
    face_locations = face_recognition.face_locations(img)
    unknown_face_encodings = face_recognition.face_encodings(img, face_locations)

    face_names = []
    font = cv2.FONT_HERSHEY_DUPLEX
    for face_encoding in unknown_face_encodings:
        matches = face_recognition.compare_faces(faces_encoded,face_encoding)
        # global name
        name = "unknown"

        face_distances = face_recognition.face_distance(faces_encoded, face_encoding)
        best_match_index = np.argmin(face_distances)
        if matches[best_match_index]:
            name = known_face_names[best_match_index]
        face_names.append(name)

        for (top, right, bottom, left), name in zip(face_locations, face_names):
            cv2.rectangle(img, (left-20, top-20), (right+20, bottom+20), (255,0,0), 2)
            cv2.rectangle(img, (left-20, bottom-15), (right+20, bottom+20), (255,0,0), cv2.FILLED)
            cv2.putText(img, name, (left -20, bottom +15), font, 1.0, (255, 255, 255), 2)
        # answer=name
        print(name)
    # while True:
    #     cv2.imshow('video', img)
        
    #     if cv2.waitKey(1) & 0xFF == ord('q'):
    return face_names
        

# print(classify_face("ciya/ciya.jpg"))


if __name__ == '__main__':
    app.run()