

build:
	@echo "Building the project..."
	docker build -t threadpool-benchmark .

run:
	@echo "Running the benchmark..."
	docker run --rm -e UV_THREADPOOL_SIZE=$(THREADS) -v $(shell pwd):/app threadpool-benchmark

plot:
	@echo "Plotting the results..."
	node plot.js