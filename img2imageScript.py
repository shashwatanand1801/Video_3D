import os
from PIL import Image
import cv2

# Get the current working directory
current_path = os.getcwd()
print(current_path)

# Folder containing images
img_dir = "Images"

def create_video_from_images(folder):
    """Generate a video from all images in the specified folder."""
    video_filename = 'created_video.mp4'
    valid_images = [i for i in os.listdir(folder) if i.endswith((".jpg", ".jpeg", ".png"))]

    first_image = cv2.imread(os.path.join(folder, valid_images[0]))
    h, w, _ = first_image.shape

    codec = cv2.VideoWriter_fourcc(*'mp4v')
    vid_writer = cv2.VideoWriter(video_filename, codec, 30, (w, h))

    for img in valid_images:
        loaded_img = cv2.imread(os.path.join(folder, img))
        for _ in range(20):
            vid_writer.write(loaded_img)

    vid_writer.release()

def display_video_from_images(folder):
    """Display the video from all images in the specified folder."""
    video_filename = 'created_video.mp4'
    valid_images = [i for i in os.listdir(folder) if i.endswith((".jpg", ".jpeg", ".png"))]

    first_image = cv2.imread(os.path.join(folder, valid_images[0]))
    h, w, _ = first_image.shape

    vid_reader = cv2.VideoCapture(video_filename)

    while True:
        ret, frame = vid_reader.read()
        if not ret:
            # Restart the video when it reaches the end
            vid_reader.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue
        cv2.imshow("Video", frame)
        if cv2.waitKey(30) & 0xFF == ord('q'):  # Exit when 'q' key is pressed
            break

    vid_reader.release()
    cv2.destroyAllWindows()


# Create video from resized images
create_video_from_images(img_dir)
# Display the video as output
display_video_from_images(img_dir)