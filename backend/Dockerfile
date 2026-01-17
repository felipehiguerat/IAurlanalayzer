FROM continuumio/miniconda3

WORKDIR /app

# Copy environment file
COPY environment.yaml .

# Update the base environment with dependencies from the file
RUN conda env update -n base -f environment.yaml

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
