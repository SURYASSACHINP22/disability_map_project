import streamlit as st
import cv2
import numpy as np
from matplotlib import pyplot as plt

# Streamlit interface
st.title("Sambar Masala Color Analysis")

# User 1 image selection
st.header("User 1: Select Images")
uploaded_file1 = st.file_uploader("Upload the first image (before exposure)", type=["jpg", "jpeg", "png"], key="user1_before")
uploaded_file2 = st.file_uploader("Upload the second image (after exposure)", type=["jpg", "jpeg", "png"], key="user1_after")

# User 2 image selection
st.header("User 2: Select Images")
uploaded_file3 = st.file_uploader("Upload the first image (before exposure)", type=["jpg", "jpeg", "png"], key="user2_before")
uploaded_file4 = st.file_uploader("Upload the second image (after exposure)", type=["jpg", "jpeg", "png"], key="user2_after")

def preprocess_images(img1, img2):
    """Preprocess images to ensure they have the same size and channels."""
    # Resize the second image to match the first image's size
    img2 = cv2.resize(img2, (img1.shape[1], img1.shape[0]))

    # Ensure images have the same number of channels
    if len(img1.shape) != len(img2.shape):  # Handle grayscale and RGB mismatch
        img1 = cv2.cvtColor(img1, cv2.COLOR_GRAY2BGR) if len(img1.shape) == 2 else img1
        img2 = cv2.cvtColor(img2, cv2.COLOR_GRAY2BGR) if len(img2.shape) == 2 else img2

    return img1, img2

def analyze_images(img1, img2):
    """Analyze the difference between two images."""
    img1, img2 = preprocess_images(img1, img2)

    # Calculate the absolute difference
    diff = cv2.absdiff(img1, img2)
    mean_diff = np.mean(diff)

    # Plotting
    fig, axs = plt.subplots(1, 3, figsize=(15, 5))
    axs[0].imshow(cv2.cvtColor(img1, cv2.COLOR_BGR2RGB))
    axs[0].set_title('Before Exposure')
    axs[0].axis('off')

    axs[1].imshow(cv2.cvtColor(img2, cv2.COLOR_BGR2RGB))
    axs[1].set_title('After Exposure')
    axs[1].axis('off')

    axs[2].imshow(cv2.cvtColor(diff, cv2.COLOR_BGR2RGB))
    axs[2].set_title(f'Difference (Mean: {mean_diff:.2f})')
    axs[2].axis('off')

    st.pyplot(fig)
    plt.close(fig)  # Close the figure to prevent warnings and memory issues

# Image processing for User 1
if uploaded_file1 and uploaded_file2:
    img1 = cv2.imdecode(np.frombuffer(uploaded_file1.read(), np.uint8), cv2.IMREAD_COLOR)
    img2 = cv2.imdecode(np.frombuffer(uploaded_file2.read(), np.uint8), cv2.IMREAD_COLOR)
    st.subheader("User 1 Analysis")
    analyze_images(img1, img2)

# Image processing for User 2
if uploaded_file3 and uploaded_file4:
    img3 = cv2.imdecode(np.frombuffer(uploaded_file3.read(), np.uint8), cv2.IMREAD_COLOR)
    img4 = cv2.imdecode(np.frombuffer(uploaded_file4.read(), np.uint8), cv2.IMREAD_COLOR)
    st.subheader("User 2 Analysis")
    analyze_images(img3, img4)
